import express from 'express'
import cors from 'cors'
import { HttpStatusCode } from 'axios'
import { AppConfig } from './config/config' 
import { requestIdMiddleware } from './middlewares/requestIdMiddleware'
import { bodyParserMiddleware } from './middlewares/bodyParserMiddleware'
import { initIntervals, clearIntervals } from './services/IntervalsService'
import { getImageBL, uploadImageBL } from './BL/ImagesBL'
import multer from 'multer'


const port = AppConfig.ports.ySestemServer
const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors({ optionsSuccessStatus: HttpStatusCode.Ok }))
app.use(requestIdMiddleware)
app.use(bodyParserMiddleware)

app.post(`${AppConfig.routes.images.uploadImage}`, upload.single('image'), async (req, res) => { 
	try {
		console.log(`Received POST request on ${AppConfig.routes.images.uploadImage}`)
		const file = req.file 
		const expiredDate = req.body.expiredDate as number
		const phone = req.body.phone as number

		if (file && expiredDate && phone) {

			const resImageId = await uploadImageBL(file, expiredDate, phone)
			res.status(HttpStatusCode.Ok).json({ imageId: resImageId })  
		} else {
			res.status(HttpStatusCode.BadRequest).send("upload image error")
		}
	} catch (err) {
		console.log({ message: `Error add image`, error: err })
	}
})

app.get(`${AppConfig.routes.images.getImage}`, async (req, res) => {
	try {
		console.log(`Received GET request on ${AppConfig.routes.images.getImage}`)
		const { imageID } = req.params
		if (imageID) {
			const data = await getImageBL(imageID)
			if (data) {
				res.setHeader("Content-Type", data?.ContentType || "image/jpeg");
				data.Body.pipe(res);
			} else {
				res.status(HttpStatusCode.BadRequest).send("image not found")
			}
		} else {
			res.status(HttpStatusCode.BadRequest).send("get image error")
		}
	} catch (err) {
		console.log({ message: `Error add image`, error: err })
	}

})

app.get('/', async (_req, res) => {
	res.send({ message: 'Hello Y-SestemServer Server!' })
})

const server = app.listen(port, async () => {
	console.log({ message: `🚀 Y-Sestem Server is ready on port ${port}` })
	initIntervals(server, port)
})

const onTermination = (signal: NodeJS.Signals) => {
	console.log({ message: `${signal} signal received.`})
	server.close(() => {
		console.log({ message: 'HTTP server closed.' })
		clearIntervals()
		process.exit(0)
	})
}

process.on('SIGINT', onTermination)
process.on('SIGTERM', onTermination)