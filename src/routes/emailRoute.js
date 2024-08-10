import { Router } from "express";
import emailController from "../controllers/emailController.js";
import { getToken, verifyToken } from "../middleware/authMiddleware.js";
import leadPipeline from "../Validator/leadPipeline.js";


const route = Router()
const { getDomainKey, dkimLookup, dnsLookup, createVariable, getOrgVariable, dkimGenerator, sendMail, dkimLookupRequest } = emailController
const {validateMessagingTemplateVariable, createLeadVal} = leadPipeline

route.get('/getDomainKey/:domain', getToken, verifyToken, getDomainKey)
route.get('/DomainKeyLookup/:domain', getToken, verifyToken, dkimLookup)
route.get('/domain_lookup', dnsLookup)
route.get('/template/variables', getToken, verifyToken, getOrgVariable)
route.post('/template/variables', getToken, verifyToken, validateMessagingTemplateVariable, createLeadVal, createVariable)
route.get('/dkim_generate/:domain', getToken, verifyToken, dkimGenerator)
route.post('/dkim_lookup', getToken, verifyToken, dkimLookupRequest)
route.get('/send', sendMail)

export default route