import { users } from '@/infrastructure/database'

export type User = typeof users.$inferSelect
