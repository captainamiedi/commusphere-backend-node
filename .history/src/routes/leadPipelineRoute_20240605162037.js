import { Router } from "express";
import leadPipelineController from "../controllers/leadPipelineController.js";
import leadPipeline from "../Validator/leadPipeline.js";
import { getToken, verifyToken} from '../middleware/authMiddleware.js'

const route = Router()

const { createLead, getLeadsByOrgId, leadOpportunityCreate, createOrganizationLeadStatus, getOrganizationLeadStatus, createActivity, updateActivity, deleteActivity, getLeadActivity, getLeadContact, createContact, updateContact, deleteContact, updateOpportunity, deleteOpportunity, deleteLeadRequest, updateLeadRequest, getSingleLeadId } = leadPipelineController
const { createLeadVal, validateLeadForm, validateLeadOpportunity, validateStatus , validateLeadActivity, validateLeadContact} = leadPipeline


route.post('/lead_pipeline', getToken, verifyToken, validateLeadForm, createLeadVal, createLead)
route.get('/lead_pipeline/:id', getToken, verifyToken, getSingleLeadId)
route.get('/lead_pipeline', getToken, verifyToken, getLeadsByOrgId)
route.post('/lead_opportunity/:id', getToken, verifyToken, validateLeadOpportunity, createLeadVal, leadOpportunityCreate)
route.post('/organization_status', getToken, verifyToken, validateStatus, createLeadVal, createOrganizationLeadStatus)
route.get('/organization_status', getToken, verifyToken, getOrganizationLeadStatus)
route.post('/lead_activity/:id', getToken, verifyToken, validateLeadActivity, createLeadVal, createActivity)
route.put('/lead_activity/:id', getToken, verifyToken, updateActivity)
route.delete('/lead_activity/:id', getToken, verifyToken, deleteActivity)
route.get('/lead_activity/:id', getToken, verifyToken, getLeadActivity)
route.get('/lead_contact/:id', getToken, verifyToken, getLeadContact)
route.post('/lead_contact/:id', getToken, verifyToken, validateLeadContact, createLeadVal, createContact)
route.put('/lead_contact/:id', getToken, verifyToken, updateContact)
route.delete('/lead_contact/:id', getToken, verifyToken, deleteContact)
route.put('/lead_opportunity/:id', getToken, verifyToken, updateOpportunity)
route.delete('/lead_opportunity/:id', getToken, verifyToken, deleteOpportunity)
route.delete('/lead_pipeline/:id', getToken, verifyToken, deleteLeadRequest)
route.put('/lead_pipeline/:id', getToken, verifyToken, updateLeadRequest)

export default route