let io

function init(server) {

  const { Server } =
    require("socket.io")

  io = new Server(server, {
     cors: {

    origin:
      "http://localhost:5173",

    methods:
      ["GET", "POST"]
  }
  })

  io.on("connection", socket => {

    console.log("Socket connected")

    socket.on("join-project", projectId => {

      socket.join(projectId)
    })

    socket.on("disconnect", () => {

      console.log("Socket disconnected")
    })
  })
}

function emitEvent(
  projectId,
  event,
  data
) {

  io.to(projectId).emit(event, data)
}

module.exports = {
  init,
  emitEvent
}