import { useState } from 'react'
import { apiFetchImage } from '../API/getUploadImages'

const useFetchImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchImage = async (imageId: string) => {
    setError(null)
    setImageSrc(null)

    try {
      const imageUrl = await apiFetchImage(imageId)
      setImageSrc(imageUrl)
    } catch (err) {
      console.error('Error fetching image:', err)
      setError('Failed to load image')
    }
  }

  return { imageSrc, error, fetchImage }
}

export default useFetchImage
