const express = require("express")

const router = express.Router()

const authMiddleware =
  require("../middleware/authMiddleware")

const {
  createTask,
  updateTask,
  getTasks,
  retryTask,
  getTaskHistory
} = require("../controllers/taskController")

router.post(
  "/",
  authMiddleware,
  createTask
)

router.get(
  "/project/:projectId",
  authMiddleware,
  getTasks
)

router.put(
  "/:id",
  authMiddleware,
  updateTask
)

router.post(
  "/:id/retry",
  authMiddleware,
  retryTask
)

router.get(
  "/:id/history",
  authMiddleware,
  getTaskHistory
)

module.exports = router