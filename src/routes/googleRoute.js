import { Router } from "express";
import googleController from '../controllers/googleController.js'
import { getToken, verifyToken } from "../middleware/authMiddleware.js";

const route = Router()
const { getUserAuthorization, oauth2callback, gmailPushWebhook, getOauthToken, googleAuth, watchGmailMessage } = googleController

route.get('/google_authorize', getUserAuthorization)
route.get('/test', () => {
    console.log('this is a testing function');
})
route.get('/oauth2callback', getToken, verifyToken, getOauthToken)
route.post('/gmail-webhook', gmailPushWebhook)
route.get('/google/auth', getToken, verifyToken, googleAuth)
route.get('/google/watch', getToken, verifyToken, watchGmailMessage)

export default route