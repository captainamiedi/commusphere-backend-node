import { createSurvey, createSurveyComment, createSurveyTemplate, deleteSurvey, fetchAllSurvey, fetchAllTemplate, fetchCommentForSurvey, fetchSurveyById, updateSurvey } from "../Service/surveyService.js";
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";

export default {
    createSurveyController: async (req, res) => {
        try {
            const { content, title, metadata} = req.body
            const payload = {
                org_id: req.userData.org_id,
                content,
                title,
                metadata,
                created_by: req.userData.id
            }
            const survey = await createSurvey(payload)
            return successResponseWithData(res, statusCode.created, 'Survey created successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    updateSurveyController: async (req, res) => {
        try {
            const {id} = req.params
            const { content, title, metadata} = req.body
            const payload = {
                org_id: req.userData.org_id,
                content,
                title,
                metadata,
                created_by: req.userData.id
            }
            const survey = await updateSurvey(payload, id)
            return successResponse(res, statusCode.success, 'Survey updated successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    deleteSurveyController: async (req, res) => {
        try {
            const {id} = req.params
            const survey = await deleteSurvey(id)
            return successResponse(res, statusCode.success, 'Survey deleted successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    fetchAllSurveyController: async (req, res) => {
        try {
            const {org_id} = req.userData
            const survey = await fetchAllSurvey(org_id)
            return successResponseWithData(res, statusCode.success, 'Survey successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    fetchSurveyController: async (req, res) => {
        try {
            const {id} = req.params
            const survey = await fetchSurveyById(id)
            return successResponseWithData(res, statusCode.success, 'Survey successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    createSurveyComment: async (req, res) => {
        try {
            const { comment, metadata, survey_id} = req.body
            console.log(req.userData);
            
            const payload = {
                org_id: req.userData.org_id,
                comment,
                metadata,
                user_id: req.userData.id,
                survey_id
            }
            const survey = await createSurveyComment(payload)
            return successResponseWithData(res, statusCode.created, 'Survey created successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    fetchSurveyComment: async (req, res) => {
        try {
            const {survey_id} = req.params
            const survey = await fetchCommentForSurvey(req.userData.id, survey_id)
            return successResponseWithData(res, statusCode.created, 'Survey created successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    fetchAllSurveyTemplate: async (req, res) => {
        try {
            const survey = await fetchAllTemplate()
            return successResponseWithData(res, statusCode.created, 'Survey created successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    },
    createAllSurveyTemplate: async (req, res) => {
        try {
            const { content, title, metadata} = req.body
            const payload = {
                org_id: req.userData.org_id,
                content,
                title,
                metadata,
                created_by: req.userData.id
            }
            const survey = await createSurveyTemplate(payload)
            return successResponseWithData(res, statusCode.created, 'Survey created successfully', survey)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.status || statusCode.serverError, error)
        }
    }
}