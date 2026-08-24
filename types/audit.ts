export type AuditFields = {
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  isDeleted: boolean
}

export function createAuditFields(actorId: string, at: string = new Date().toISOString()): AuditFields {
  return { createdAt: at, createdBy: actorId, updatedAt: at, updatedBy: actorId, isDeleted: false }
}

export function touchAuditFields<T extends AuditFields>(
  entity: T,
  actorId: string,
  at: string = new Date().toISOString()
): T {
  return { ...entity, updatedAt: at, updatedBy: actorId }
}
