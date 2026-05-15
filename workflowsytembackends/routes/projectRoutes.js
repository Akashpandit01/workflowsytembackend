const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
  createProject,
  generateInvite,
  joinProject,
  getProjects,
  computeExecutionPlan,
simulateExecution
} = require("../controllers/projectController")

router.post("/", authMiddleware, createProject)

router.get("/", authMiddleware, getProjects)

router.post("/:id/invite", authMiddleware, generateInvite)

router.post("/join", authMiddleware, joinProject)

router.post(
  "/:projectId/compute-execution",
  authMiddleware,
  computeExecutionPlan
)

router.post(
  "/:projectId/simulate",
  authMiddleware,
  simulateExecution
)

module.exports = router
