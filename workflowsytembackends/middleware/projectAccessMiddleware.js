const Project =
  require("../models/Project")

module.exports = async (
  req,
  res,
  next
) => {

  try {

    const projectId =
      req.params.projectId ||
      req.params.id ||
      req.body.projectId

    const project =
      await Project.findById(
        projectId
      )

    if (!project) {

      return res.status(404).json({
        message:
          "Project not found"
      })
    }

    const isMember =
      project.members.includes(
        req.user.id
      )

    if (!isMember) {

      return res.status(403).json({
        message:
          "Access denied"
      })
    }

    req.project = project

    next()

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}