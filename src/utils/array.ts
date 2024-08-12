/**
 * Joins the elements of a string array into a single string, separated by ", ".
 * Exemple: ['First', 'Second', 'Third'] => 'First, Second, Third'
 * @param {string[]} arr Array of strings to be joined.
 * @returns {string} String with each array element separated by ", ".
 */
export const ArrayToString = (arr: string[]): string => {
  return arr.join(', ')
}
