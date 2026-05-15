const Task = require("../models/Task")

const Project =
  require("../models/Project")

const hasCycle =
  require("../utils/cycleDetection")

const {
  emitEvent
} = require("../sockets/socket")

const triggerWebhook =
  require("../services/webhookService")

// ==============================
// CREATE TASK
// ==============================

exports.createTask = async (
  req,
  res
) => {

  try {

    // create task

    const createdTask =
      await Task.create(
        req.body
      )

    // populate dependencies

    const task =
      await Task.findById(
        createdTask._id
      ).populate(
        "dependencies"
      )

    // cycle detection

    const tasks =
      await Task.find({
        projectId:
          req.body.projectId
      })

    const cycle =
      hasCycle(tasks)

    if (cycle) {

      await Task.findByIdAndDelete(
        task._id
      )

      return res.status(400).json({
        message:
          "Dependency cycle detected"
      })
    }

    // realtime event

    emitEvent(
      task.projectId.toString(),
      "task-created",
      task
    )

    res.status(201).json(task)

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}

// ==============================
// GET TASKS
// ==============================

exports.getTasks = async (
  req,
  res
) => {

  try {

    const tasks =
      await Task.find({
        projectId:
          req.params.projectId
      }).populate(
        "dependencies"
      )

    res.json(tasks)

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}

// ==============================
// UPDATE TASK
// ==============================

exports.updateTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      ).populate(
        "dependencies"
      )

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found"
      })
    }

    // optimistic concurrency

    if (
      req.body.versionNumber !==
      task.versionNumber
    ) {

      return res.status(409).json({
        message:
          "Version conflict",

        latest: task
      })
    }

    // resource locking

    if (
      req.body.status ===
      "Running"
    ) {

      const runningTask =
        await Task.findOne({

          _id: {
            $ne:
              task._id
          },

          resourceTag:
            task.resourceTag,

          status:
            "Running"
        })

      if (runningTask) {

        return res.status(400).json({
          message:
            "Another running task already uses this resource"
        })
      }

      // dependency validation

      const dependencyTasks =
        await Task.find({

          _id: {
            $in:
              task.dependencies.map(
                dep =>
                  dep._id || dep
              )
          }
        })

      const incompleteDependency =
        dependencyTasks.find(
          dep =>
            dep.status !==
            "Completed"
        )

      if (
        incompleteDependency
      ) {

        return res.status(400).json({
          message:
            "Dependencies are not completed"
        })
      }
    }

    // save history

    task.history.push({

      title:
        task.title,

      description:
        task.description,

      versionNumber:
        task.versionNumber,

      updatedAt:
        new Date()
    })

    // update task

    Object.assign(
      task,
      req.body
    )

    // increment version

    task.versionNumber += 1

    await task.save()

    // cycle detection

    const tasks =
      await Task.find({
        projectId:
          task.projectId
      })

    const cycle =
      hasCycle(tasks)

    if (cycle) {

      return res.status(400).json({
        message:
          "Dependency cycle detected"
      })
    }

    // populate updated task

    const updatedTask =
      await Task.findById(
        task._id
      ).populate(
        "dependencies"
      )

    // realtime event

    emitEvent(
      task.projectId.toString(),
      "task-updated",
      updatedTask
    )

    // webhook trigger

    if (
      updatedTask.status ===
      "Completed"
    ) {

      const project =
        await Project.findById(
          updatedTask.projectId
        )

      await triggerWebhook(
        project,
        {
          event:
            "TASK_COMPLETED",

          taskId:
            updatedTask._id,

          title:
            updatedTask.title
        }
      )
    }

    res.json(updatedTask)

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}

// ==============================
// RETRY TASK
// ==============================

exports.retryTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      )

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found"
      })
    }

    if (
      task.retryCount >=
      task.maxRetries
    ) {

      return res.status(400).json({
        message:
          "Retry limit exceeded"
      })
    }

    task.retryCount += 1

    task.status =
      "Pending"

    await task.save()

    // realtime event

    emitEvent(
      task.projectId.toString(),
      "retry-attempted",
      task
    )

    res.json(task)

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}

// ==============================
// TASK HISTORY
// ==============================

exports.getTaskHistory =
async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      )

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found"
      })
    }

    res.json(
      task.history
    )

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    })
  }
}
