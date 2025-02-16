import { S3Client, PutObjectCommand, PutObjectTaggingCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { accessKeyId, bucketName, region, secretAccessKey } from "../appConfig"
import { Readable } from "stream"

const millisecondsInDay = 24 * 60 * 60 * 1000

const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
})

export const uploadImageToS3 = async (fileBuffer: Buffer<ArrayBufferLike>, fileName: string, contentType: string, expiredDate: number ) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: contentType
    }
    try {
      await s3Client.send(new PutObjectCommand(uploadParams))
      await setExpiredDateTag(fileName, expiredDate)
      return fileName
    } catch (error) {
      console.error(`Error uploading file: ${error}`)
      return null
    }
}

export const getUploadImageFromS3 = async (fileName: string) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    }
    const command = new GetObjectCommand(params)
    const data = await s3Client.send(command)

    if (data.Body && data.Body instanceof Readable) {
      return {
        Body: data.Body,
        ContentType: data.ContentType,
      }
    }

  } catch (error) {
    console.error(`Error getting file: ${error}`)
  }
}


const setExpiredDateTag = async (fileName: string, expiredDate: number) => {
  const expirationDate = new Date()
  
  expirationDate.setTime(expirationDate.getTime() + expiredDate * millisecondsInDay)

  const tags = [
    { Key: "expirationDate", Value: expirationDate.toISOString() }
  ]

  const taggingParams = {
    Bucket: bucketName,
    Key: fileName,
    Tagging: {
        TagSet: tags
    }
  }

  try {
    await s3Client.send(new PutObjectTaggingCommand(taggingParams))
    return true
  } catch (error) {
    console.error(`Error uploading tag file: ${error}`)
    return false
  }
}

