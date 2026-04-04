export const FALLBACK_EVENT_IMAGE = '/event-fallback.svg'

const getGoogleDriveFileId = (url) => {
  const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/)
  if (fileMatch) {
    return fileMatch[1]
  }

  return url.searchParams.get('id')
}

export const normalizeEventImageUrl = (imageUrl) => {
  const trimmedUrl = typeof imageUrl === 'string' ? imageUrl.trim() : ''
  if (!trimmedUrl) {
    return ''
  }

  try {
    const parsedUrl = new URL(trimmedUrl)
    const hostname = parsedUrl.hostname.replace(/^www\./, '')

    if (hostname === 'drive.google.com') {
      const fileId = getGoogleDriveFileId(parsedUrl)
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`
      }
    }

    if (hostname === 'dropbox.com') {
      parsedUrl.searchParams.delete('dl')
      parsedUrl.searchParams.set('raw', '1')
      return parsedUrl.toString()
    }

    return trimmedUrl
  } catch {
    return trimmedUrl
  }
}

export const getEventImageUrl = (imageUrl) => normalizeEventImageUrl(imageUrl) || FALLBACK_EVENT_IMAGE
