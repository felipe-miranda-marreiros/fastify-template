async function set<TData>(key: string, data: TData) {
  console.log(key, data)
}

export const redisAdapter = {
  set
}
