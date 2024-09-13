export const capitaliseFirstLetter = (string: string) => {
  return string ? string[0].toUpperCase() + string.slice(1) : string
}

// Prevents open redirect vulnerabilities
export const isNonRelativeUrl = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://')
}
