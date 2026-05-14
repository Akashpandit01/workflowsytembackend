const mongoose = require("mongoose")

const webhookLogSchema =
  new mongoose.Schema(
    {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      },

      url: String,

      payload: Object,

      status: String,

      retryCount: Number,

      response: String
    },
    {
      timestamps: true
    }
  )

module.exports =
  mongoose.model(
    "WebhookLog",
    webhookLogSchema
  )