import { Actions, Resources, Roles } from '../models/authorization-models'
import { permit } from '../config/authorization-config'
import { log } from '@/infrastructure/logger'

async function claimRole(email: string, role: Roles): Promise<void> {
  try {
    log.info(`Creating user with role based on e-mail (${email})`)
    await permit.api.users.sync({
      key: email,
      email,
      role_assignments: [{ role, tenant: 'default' }]
    })
  } catch (error) {
    log.error(`Falied creting user with role on e-mail (${email})`, error)
  }
}

async function check(
  email: string,
  action: Actions,
  resource: Resources
): Promise<boolean> {
  const permitted = await permit.check(email, action, resource)
  return permitted
}

export const authorizationService = {
  claimRole,
  check
}
