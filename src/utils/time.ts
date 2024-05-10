export const getCurrentYear = () => new Date().getFullYear()
export const hasExpired = (date: Date) => new Date(date) < new Date()
