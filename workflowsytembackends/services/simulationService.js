function simulate(
  tasks,
  availableHours
) {

  let usedHours = 0

  const selectedTasks = []

  const blockedTasks = []

  const skippedTasks = []

  const completedTaskIds =
    new Set()

  tasks.sort((a, b) => {

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
  })

  for (const task of tasks) {

    // blocked task

    if (
      task.status ===
      "Blocked"
    ) {

      blockedTasks.push(task)

      continue
    }

    // dependency validation

    const dependenciesMet =
      task.dependencies.every(
        dep =>
          completedTaskIds.has(
            dep.toString()
          )
      )

    if (!dependenciesMet) {

      skippedTasks.push(task)

      continue
    }

    // time check

    if (
      usedHours +
        task.estimatedHours <=
      availableHours
    ) {

      selectedTasks.push(task)

      usedHours +=
        task.estimatedHours

      completedTaskIds.add(
        task._id.toString()
      )

    } else {

      skippedTasks.push(task)
    }
  }

  const totalPriorityScore =
    selectedTasks.reduce(
      (acc, task) =>
        acc + task.priority,
      0
    )

  return {

    executionOrder:
      selectedTasks.map(
        task => task.title
      ),

    selectedTasks,

    blockedTasks,

    skippedTasks,

    totalPriorityScore,

    usedHours,

    remainingHours:
      availableHours -
      usedHours
  }
}

module.exports =simulate