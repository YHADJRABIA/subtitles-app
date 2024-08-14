export const capitaliseFirstLetter = (string: string) => {
  return string ? string[0].toUpperCase() + string.slice(1) : string
}

/**
 * Formats a number with a leading zero if it's less than 10.
 * @param num Number to format.
 * @returns Formatted string.
 */
export const formatNumber = (num: number): string => {
  return num < 10 ? `0${num}` : String(num)
}
