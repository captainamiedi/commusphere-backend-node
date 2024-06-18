import { Router } from "express";
import emailTemplateController from "../controllers/emailTemplateController.js";
import leadPipeline from "../Validator/leadPipeline.js";
import { getToken, verifyToken} from '../middleware/authMiddleware.js'

const route = Router()

const { createEmailTemplate, updateTemplate, getTemplateByOrg, deleteTemplate, getTemplateById} = emailTemplateController
const { createLeadVal, validateEmailTemplate} = leadPipeline

route.post('/create_template', getToken, verifyToken, validateEmailTemplate, createLeadVal, createEmailTemplate)
route.put('/template/:id', getToken, verifyToken, updateTemplate)
route.get('/template', getToken, verifyToken, getTemplateByOrg)
route.delete('/template/:id', getToken, verifyToken, deleteTemplate)
route.get('/template/:id', getToken, verifyToken, getTemplateById)


export default route