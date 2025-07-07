import { createClient, RedisClientType } from 'redis'
import { ENV } from '@/shared/config'
import { log } from '../logger'

export const cache = {
  client: null as unknown as RedisClientType,

  build: async function () {
    try {
      this.client = createClient({
        url: ENV.REDIS_URL
      })
      await this.client.connect()
    } catch (error) {
      log.error('Connection to Redis falied', error)
    }
  },

  set: async function <TData>(
    key: string,
    data: TData,
    ttl?: number
  ): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(data), {
        EX: ttl
      })
    } catch (error) {
      log.error('Setting cache data falied', error)
    }
  },

  get: async function <TData>(key: string): Promise<TData | null> {
    try {
      const cacheData = await this.client.get(key)
      if (!cacheData) return null
      const parsedData: TData = JSON.parse(cacheData)
      return parsedData
    } catch (error) {
      log.error('Getting cache data falied', error)
      return null
    }
  },

  invalidate: async function (key: string): Promise<void> {
    try {
      await this.client.del(key)
    } catch (error) {
      log.error('Invalidating cache data falied', error)
    }
  }
}
