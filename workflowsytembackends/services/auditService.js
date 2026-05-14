const AuditLog =
  require("../models/AuditLog")

async function createAuditLog({
  actor,
  action,
  entity,
  metadata
}) {

  await AuditLog.create({
    actor,
    action,
    entity,
    metadata
  })
}

module.exports =
  createAuditLog