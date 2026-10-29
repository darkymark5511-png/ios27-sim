/** All simulator keys live under this prefix so wipe is scoped. */
export const NS = 'ios27:'

export function nsKey(key: string) {
  return `${NS}${key}`
}

export function clearNamespacedStorage() {
  const toRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith(NS)) toRemove.push(k)
  }
  toRemove.forEach((k) => localStorage.removeItem(k))
  const sessionRemove: string[] = []
  for (let i = 0; i < sessionStorage.length; i++) {
    const k = sessionStorage.key(i)
    if (k?.startsWith(NS)) sessionRemove.push(k)
  }
  sessionRemove.forEach((k) => sessionStorage.removeItem(k))
}

export function getSessionFlag(key: string): boolean {
  return sessionStorage.getItem(nsKey(key)) === '1'
}

export function setSessionFlag(key: string, value = true) {
  if (value) sessionStorage.setItem(nsKey(key), '1')
  else sessionStorage.removeItem(nsKey(key))
}

export function getLocalFlag(key: string): boolean {
  return localStorage.getItem(nsKey(key)) === '1'
}

export function setLocalFlag(key: string, value = true) {
  if (value) localStorage.setItem(nsKey(key), '1')
  else localStorage.removeItem(nsKey(key))
}
