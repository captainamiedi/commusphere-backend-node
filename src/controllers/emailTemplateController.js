import { createEmailTemplateService, deleteEmailTemplateForOrgService, getEmailTemplateForOrgService, getTemplateById, updateEmailTemplateForOrgService } from "../Service/emailTemplateService.js";
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";

export default {
    createEmailTemplate:  async (req, res) => {
        try {
            const {
                title,
                subject,
                message,
                sender_name,
                sender_email,
                type
            } = req.body

            if (type == 'email' && !subject) {
                return errorResponse(res, statusCode.badRequest, 'Subject is required')
            }
            
            const payload = {
                org_id: req.userData.org_id,
                title, 
                subject,
                message,
                sender_email,
                sender_name, 
                type
            }
            const email = await createEmailTemplateService(payload)
            return successResponseWithData(res, statusCode.created, 'Template Created Successfully', email)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    updateTemplate:  async (req, res) => {
        try {
            const { id } = req.params
            const {
                title,
                subject,
                message,
                sender_name,
                sender_email,
                type
            } = req.body
            
            const payload = {
                title, 
                subject,
                message,
                sender_email,
                sender_name, 
                type
            }
            const exist  = await getTemplateById(id)
             if (!exist) {
                return successResponse(res, statusCode.badRequest, 'Template ID is not found')
             }
            const email = await updateEmailTemplateForOrgService(id, payload)
            return successResponse(res, statusCode.success, 'Template update Successfully')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    getTemplateById: async (req, res) => {
        try {
            const { id } = req.params
            const email = await getTemplateById(id)
            return successResponseWithData(res, statusCode.success, 'Template fetched successful', email)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    getTemplateByOrg: async (req, res) => {
        try {
            const { org_id } = req.userData
            const email = await getEmailTemplateForOrgService(org_id)
            return successResponseWithData(res, statusCode.success, 'Template fetched successful', email)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    deleteTemplate: async (req, res) => {
        try {
            const { id } = req.params
            await deleteEmailTemplateForOrgService(id)
            return successResponse(res, statusCode.success, 'Template delete successful')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)    
        }
    }
}