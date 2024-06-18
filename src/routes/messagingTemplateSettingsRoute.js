import { Router } from "express";
import leadPipeline from "../Validator/leadPipeline.js";
import { getToken, verifyToken} from '../middleware/authMiddleware.js'
import messagingTemplateSettingController from "../controllers/messagingTemplateSettingController.js";

const route = Router()

const { createLeadVal,validateMessagingTemplateSetting } = leadPipeline
const { createMessageSetting, updateMessageSetting, deleteTemplateSetting} = messagingTemplateSettingController

route.post('/messaging/settings', getToken, verifyToken, validateMessagingTemplateSetting, createLeadVal, createMessageSetting)
route.put('/messaging/settings/:id', getToken, verifyToken, validateMessagingTemplateSetting, createLeadVal, updateMessageSetting)
route.delete('/messaging/settings/:id', getToken, verifyToken, deleteTemplateSetting)

export default route
