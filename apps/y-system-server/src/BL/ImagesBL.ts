
import crypto from 'crypto'
import sharp from 'sharp'
import { getUploadImageFromS3, uploadImageToS3 } from '../DAL/s3DAL'
import { sendImageIdSMS } from '../services/SMSService'

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const uploadImageBL = async (file: Express.Multer.File, expiredDate: number, phone: number) => {
    const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

    const fileName = generateFileName()
    const resId = await uploadImageToS3(fileBuffer, fileName, file.mimetype, expiredDate)
    if (resId) {
        sendImageIdSMS(resId, phone)
        return resId
    } else {
        return false
    }
}

export const getImageBL = async (imageId: string) => {
    return await getUploadImageFromS3(imageId)
}