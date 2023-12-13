import { Router } from 'express'
import metaController from '../controllers/metaController.js'

const route = Router()

route.post('/consumer_instagram/webhook', metaController.instagramConsumerWebhook)
route.post('/consumer_instagram/oauth2callback', metaController.oauth2callback)

export default route