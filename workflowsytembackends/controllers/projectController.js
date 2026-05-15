const jwt = require("jsonwebtoken")

const Project = require("../models/Project")
const Task = require("../models/Task")

const computeExecution =
  require("../services/executionService")

const simulate =
  require("../services/simulationService")

exports.createProject = async (req, res) => {
  try {

    const project = await Project.create({
      name: req.body.name,
      owner: req.user.id,
      members: [req.user.id]
    })

    res.status(201).json(project)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      members: req.user.id
    })

    res.json(projects)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.generateInvite = async (req, res) => {

  try {

    const token = jwt.sign(
      {
        projectId: req.params.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m"
      }
    )

    res.json({
      inviteLink:
        `http://localhost:5173/join/${token}`
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.joinProject = async (req, res) => {

  try {

    const { token } = req.body

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const project = await Project.findById(
      decoded.projectId
    )

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      })
    }

    if (
      !project.members.includes(req.user.id)
    ) {

      project.members.push(req.user.id)

      await project.save()
    }

    res.json({
      message: "Joined project successfully"
    })

  } catch (error) {

    res.status(400).json({
      message: "Invalid or expired invite token"
    })
  }
}

exports.computeExecutionPlan =
async (req, res) => {

  try {

    const tasks = await Task.find({
      projectId: req.params.projectId,
      status: { $ne: "Blocked" }
    })

    const result = computeExecution(tasks)

    res.json(result)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.simulateProject =
async (req, res) => {

  try {

    const { availableHours } = req.body

    const tasks = await Task.find({
      projectId: req.params.projectId,
      status: "Pending"
    })

    const result = simulate(
      tasks,
      availableHours
    )

    res.json(result)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

exports.simulateExecution =
async (req, res) => {

  try {

    const {
      availableHours
    } = req.body

    const tasks =
      await Task.find({

        projectId:
          req.params.projectId

      }).populate(
        "dependencies"
      )

    const pendingTasks =
      tasks.filter(
        task =>
          task.status !==
          "Completed"
      )

    pendingTasks.sort(
      (a, b) => {

        if (
          b.priority !==
          a.priority
        ) {

          return (
            b.priority -
            a.priority
          )
        }

        return (
          a.estimatedHours -
          b.estimatedHours
        )
      }
    )

    let usedHours = 0

    let totalPriority = 0

    const selectedTasks = []

    const skippedTasks = []

    const blockedTasks = []

    for (
      const task
      of pendingTasks
    ) {

      const incompleteDependency =
        task.dependencies.find(
          dep =>
            dep.status !==
            "Completed"
        )

      if (
        incompleteDependency
      ) {

        blockedTasks.push(
          task
        )

        continue
      }

      if (

        usedHours +
        task.estimatedHours <=
        availableHours

      ) {

        selectedTasks.push(
          task
        )

        usedHours +=
          task.estimatedHours

        totalPriority +=
          task.priority

      } else {

        skippedTasks.push(
          task
        )
      }
    }

    res.json({

      selectedTasks,

      skippedTasks,

      blockedTasks,

      totalPriority,

      usedHours,

      remainingHours:
        availableHours -
        usedHours
    })

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    })
  }
}
