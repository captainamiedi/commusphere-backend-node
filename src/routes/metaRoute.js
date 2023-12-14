import { Router } from 'express'
import metaController from '../controllers/metaController.js'

const route = Router()

const {facebookWebhook, instagramWebhook} = metaController

route.get('/consumer_instagram/webhook', metaController.instagramConsumerWebhook)
route.post('/consumer_instagram/oauth2callback', metaController.oauth2callback)
route.post('/consumer_instagram/webhook', instagramWebhook)

export default route