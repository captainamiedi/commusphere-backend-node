import { Router } from "express";
import { getToken, verifyToken } from "../middleware/authMiddleware.js";
import SurveyController from "../controllers/SurveyController.js";
import leadPipeline from "../Validator/leadPipeline.js";



const route = Router()
const {createSurveyController, updateSurveyController, deleteSurveyController, fetchAllSurveyController, fetchSurveyController, createAllSurveyTemplate, createSurveyComment, fetchAllSurveyTemplate, fetchSurveyComment} = SurveyController
const {validateSurvey, createLeadVal} = leadPipeline


route.post('/create_survey', getToken, verifyToken, validateSurvey, createLeadVal, createSurveyController)
route.put('/survey/:id', getToken, verifyToken, updateSurveyController)
route.delete('/survey/:id', getToken, verifyToken, deleteSurveyController)
route.get('/survey', getToken, verifyToken, fetchAllSurveyController)
route.get('/survey/:id', getToken, verifyToken, fetchSurveyController)
route.post('/survey_template', getToken, verifyToken, createAllSurveyTemplate)
route.get('/survey_template', getToken, verifyToken, fetchAllSurveyTemplate)
route.post('/survey_comment', getToken, verifyToken, createSurveyComment)
route.get('/survey_comment/:survey_id', getToken, verifyToken, fetchSurveyComment)

export default route