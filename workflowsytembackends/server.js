const app = require("./app")
const connectDB = require("./config/db")
const http = require("http")
const { Server } = require("socket.io")
const { init: initSocket } = require("./sockets/socket")

connectDB()

const server = http.createServer(app)

initSocket(server)

server.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`)
})