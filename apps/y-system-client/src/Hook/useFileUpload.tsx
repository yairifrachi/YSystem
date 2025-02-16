import { useState } from 'react'
import { BasicImage } from '../../../lib/modaels/types/BasicImage'
import { apiUploadFile } from '../API/getUploadImages'

const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [imageId, setImageId] = useState<string | null>(null)

  const uploadFile = async (basicImage: BasicImage) => {
    setUploadProgress(0)
    setUploadComplete(false)
    setUploadError('')
    setImageId(null)

    try {
      const { id  } = await apiUploadFile(basicImage, setUploadProgress)
      setUploadComplete(true)
      setImageId(id)
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploadError('Failed to upload file. Please try again.')
    }
  }

  return { uploadProgress, uploadComplete, uploadError, imageId, uploadFile }
}

export default useFileUpload
