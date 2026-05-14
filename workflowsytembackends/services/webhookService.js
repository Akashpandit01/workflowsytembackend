const axios = require("axios")

const WebhookLog =
  require("../models/WebhookLog")

async function triggerWebhook(
  project,
  payload
) {

  if (!project.webhookUrl) return

  let retryCount = 0

  while (retryCount < 3) {

    try {

      const response = await axios.post(
        project.webhookUrl,
        payload
      )

      await WebhookLog.create({
        projectId: project._id,
        url: project.webhookUrl,
        payload,
        status: "SUCCESS",
        retryCount,
        response:
          JSON.stringify(response.data)
      })

      return

    } catch (error) {

      retryCount++

      if (retryCount === 3) {

        await WebhookLog.create({
          projectId: project._id,
          url: project.webhookUrl,
          payload,
          status: "FAILED",
          retryCount,
          response: error.message
        })
      }
    }
  }
}

module.exports = triggerWebhook