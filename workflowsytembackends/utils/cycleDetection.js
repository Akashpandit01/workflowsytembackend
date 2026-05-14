function hasCycle(tasks) {
  const graph = {}

  tasks.forEach(task => {
    graph[task._id] = task.dependencies || []
  })

  const visited = new Set()
  const stack = new Set()

  function dfs(node) {
    if (stack.has(node)) return true

    if (visited.has(node)) return false

    visited.add(node)
    stack.add(node)

    for (const neighbor of graph[node]) {
      if (dfs(neighbor.toString())) {
        return true
      }
    }

    stack.delete(node)

    return false
  }

  for (const node in graph) {
    if (dfs(node)) {
      return true
    }
  }

  return false
}

module.exports = hasCycle