/**
 * Triggers a download of the specified file.
 *
 * @param url Full URL of the file to be downloaded.
 * @param filename Name the file will be saved as.
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
