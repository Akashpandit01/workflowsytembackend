function computeExecution(
  tasks
) {

  const indegree = {}

  const graph = {}

  tasks.forEach(task => {

    indegree[task._id] = 0

    graph[task._id] = []
  })

  tasks.forEach(task => {

    task.dependencies.forEach(
      dep => {

        graph[dep].push(task)

        indegree[task._id]++
      }
    )
  })

  const queue = []

  for (const id in indegree) {

    if (indegree[id] === 0) {

      const task =
        tasks.find(
          t => t._id == id
        )

      if (
        task.status !==
        "Blocked"
      ) {

        queue.push(task)
      }
    }
  }

  queue.sort((a, b) => {

    if (
      b.priority !==
      a.priority
    ) {

      return (
        b.priority -
        a.priority
      )
    }

    if (
      a.estimatedHours !==
      b.estimatedHours
    ) {

      return (
        a.estimatedHours -
        b.estimatedHours
      )
    }

    return (
      new Date(
        a.createdAt
      ) -
      new Date(
        b.createdAt
      )
    )
  })

  const result = []

  while (queue.length) {

    const current =
      queue.shift()

    result.push(current)

    for (
      const next of graph[
        current._id
      ]
    ) {

      indegree[next._id]--

      if (
        indegree[next._id] === 0
      ) {

        if (
          next.status !==
          "Blocked"
        ) {

          queue.push(next)
        }
      }
    }
  }

  return result
}

module.exports =
  computeExecution