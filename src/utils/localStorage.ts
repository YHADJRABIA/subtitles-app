export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string) => {
  const stored = localStorage.getItem(key)
  if (!stored) return null

  return JSON.parse(stored)
}
