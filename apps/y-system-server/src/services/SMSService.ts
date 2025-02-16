import twilio from 'twilio'
import { accountSid, authToken, twilioPhoneNumber } from '../appConfig'


const client = twilio(accountSid, authToken)

export const sendImageIdSMS = async (imageId: string, phone: number) => {
    try {
        await client.messages.create({
            body: `Your uploaded image ID: ${imageId}`,
            from: twilioPhoneNumber,
            to: `+${phone}`
        })
        console.log(`SMS sent successfully to ${phone}`)
    } catch (error) {
        console.error('Failed to send SMS:', error)
    }
}