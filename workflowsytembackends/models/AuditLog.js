const mongoose = require("mongoose")

const auditLogSchema =
  new mongoose.Schema(
    {
      actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      action: String,

      entity: String,

      metadata: Object
    },
    {
      timestamps: true
    }
  )

module.exports =
  mongoose.model(
    "AuditLog",
    auditLogSchema
  )