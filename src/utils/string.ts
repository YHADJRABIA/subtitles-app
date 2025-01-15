export const capitaliseFirstLetter = (string: string) => {
  return string ? string[0].toUpperCase() + string.slice(1) : string
}

// Prevents open redirect vulnerabilities
export const isNonRelativeUrl = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * Truncate email address to specified length, ensuring the domain is preserved.
 *
 * @param email - Email address to truncate.
 * @param maxLength - Max allowed length for email address.
 * @returns Truncated email address.
 */
export const truncateEmail = (email: string, maxLength: number): string => {
  if (email.length <= maxLength) return email

  const [localPart, domain] = email.split('@')

  // No truncation needed or invalid email
  if (!domain || localPart.length + domain.length + 1 <= maxLength) return email

  const maxLocalLength = maxLength - domain.length - 1 // Reserve space for "@" and domain

  // Typically if domain name is too long
  if (maxLocalLength <= 0) {
    return `${localPart.slice(0, 1)}...@${domain}` // Return a partial email
  }

  return `${localPart.slice(0, maxLocalLength)}...@${domain}`
}
