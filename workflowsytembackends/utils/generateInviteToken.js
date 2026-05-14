const jwt =
  require("jsonwebtoken")

function generateInviteToken(
  projectId,
  role = "member"
) {

  return jwt.sign(
    {
      projectId,
      role
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "30m",
      issuer:
        "workflow-system",
      audience:
        "project-members"
    }
  )
}

module.exports =
  generateInviteToken