// Extract video ID from YouTube URL
export const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  )
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
}

/**
 * Checks if the provided URL is a YouTube URL.
 *
 * @param {string} url URL to check.
 * @returns {boolean} Returns true if the URL is a YouTube URL.
 */
export const isYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
  return youtubeRegex.test(url)
}
