import { createTemplateSettingService, deleteTemplateSettingService, findById, updateTemplateSettingService } from "../Service/messagingTemplateSettingService.js"
import { errorResponse, successResponse } from "../utils/response.js"
import statusCode from "../utils/statusCode.js"

export default {
    createMessageSetting: async (req, res) => {
        try {
            const { org_id } = req.userData
            const {
                stage_probability,
                stage_probability_template_id,
                message_sent,
                message_sent_at,
                message_receiver,
                opportunity_id
            } = req.body
            const payload = {
                stage_probability,
                stage_probability_template_id,
                message_sent,
                message_sent_at,
                message_receiver,
                org_id,
                opportunity_id
            }
            const messagingTemplate = await createTemplateSettingService(payload)
            return successResponse(res, statusCode.created, 'Settings Created')
        } catch (error) {
           console.log(error); 
           return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    updateMessageSetting: async (req, res) => {
        try {
            const { id } = req.params
            const {
                stage_probability,
                stage_probability_template_id,
                message_sent,
                message_sent_at,
                message_receiver
            } = req.body
            const payload = {
                stage_probability,
                stage_probability_template_id,
                message_sent,
                message_sent_at,
                message_receiver,
            }
            const getById = await findById(id)
            if (!getById) {
                return errorResponse(res, statusCode.badRequest, 'Settings Id not found')
            }
            const messagingTemplate = await updateTemplateSettingService(id, payload)
            return successResponse(res, statusCode.success, 'Settings Updated successfully')
        } catch (error) {
           console.log(error); 
           return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    deleteTemplateSetting: async (req, res) => {
        try {
            const { id } = req.params
            const getById = await findById(id)
            if (!getById) {
                return errorResponse(res, statusCode.badRequest, 'Settings Id not found')
            }
            await deleteTemplateSettingService(id)
            return successResponse(res, statusCode.success, 'Setting successfully deleted')
        } catch (error) {
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    }
}