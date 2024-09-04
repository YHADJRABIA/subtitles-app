/**
 * Triggers a download of the specified file.
 *
 * @param url Full URL of the file to be downloaded.
 * @param filename Name the file will be saved as.
 */
export const downloadFile = (url: string, filename: string): void => {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a')
      const blobUrl = URL.createObjectURL(blob)

      link.href = blobUrl
      link.download = filename // Ensures the filename is used correctly
      link.click()

      // Clean up object URL after download
      URL.revokeObjectURL(blobUrl)
    })
    .catch(error => console.error('Error downloading the file:', error))
}
