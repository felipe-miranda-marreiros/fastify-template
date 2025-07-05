import { drizzle } from 'drizzle-orm/node-postgres'
import { ENV } from '@/shared/config'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: ENV.DATABASE_URL
})

export const db = drizzle({ client: pool })
