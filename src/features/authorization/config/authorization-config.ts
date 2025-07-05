import { ENV } from '@/shared/config'
import { Permit } from 'permitio'

export const permit = new Permit({
  pdp: ENV.PERMIT_PDP,
  token: ENV.PERMIT_TOKEN,
  log: { level: 'debug' },
  throwOnError: true
})
