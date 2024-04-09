import { Router } from "express";
import emailController from "../controllers/emailController.js";


const route = Router()
const { getDomainKey } = emailController

route.get('/getDomainKey/:domain', getDomainKey)

export default route