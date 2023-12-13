import { Router } from "express";
import googleController from '../controllers/googleController.js'

const route = Router()
const { getUserAuthorization, oauth2callback } = googleController

route.get('/google_authorize', getUserAuthorization)
route.get('/test', () => {
    console.log('this is a testing function');
})
route.get('/oauth2callback', oauth2callback)

export default route