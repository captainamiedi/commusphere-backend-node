import { Router } from "express";
import emailController from "../controllers/emailController.js";
import { getToken, verifyToken } from "../middleware/authMiddleware.js";


const route = Router()
const { getDomainKey, dkimLookup, dnsLookup } = emailController

route.get('/getDomainKey/:domain', getToken, verifyToken, getDomainKey)
route.get('/DomainKeyLookup/:domain', getToken, verifyToken, dkimLookup)
route.get('/domain_lookup', dnsLookup)

export default route