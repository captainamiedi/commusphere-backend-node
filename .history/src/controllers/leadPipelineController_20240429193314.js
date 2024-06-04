import {
    createLead,
    createLeadActivity,
    createLeadContact,
    createLeadOpportunity,
    createOrganizationStatus,
    deleteLead,
    deleteLeadActivity,
    deleteLeadContact,
    deleteLeadOpportunity,
    fetchLeadActivityById,
    fetchLeadContactById,
    fetchLeadsByOrg,
    fetchOrganizationStatusService,
    updateLead,
    updateLeadActivity,
    updateLeadContact,
    updateLeadOpportunity
} from "../Service/leadPipeline.js"
import {
    errorResponse,
    successResponse,
    successResponseWithData
} from "../utils/response.js"
import statusCode from "../utils/statusCode.js"

export default {
    createLead: async (req, res) => {
        try {
            const {
                name,
                source,
                status
            } = req.body
            const payload = {
                org_id: req.userData.org_id,
                name,
                source,
                status
            }

            const lead = await createLead(payload)
            return successResponseWithData(res, statusCode.created, 'Lead Created', lead)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    getLeadsByOrgId: async (req, res) => {
        try {
            const {
                org_id
            } = req.userData
            console.log(org_id);
            const leads = await fetchLeadsByOrg(org_id)
            return successResponseWithData(res, statusCode.success, 'Leads for organization successful', leads)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    leadOpportunityCreate: async (req, res) => {
        try {
            const {
                org_id
            } = req.userData
            const {
                id
            } = req.params
            const {
                product,
                value,
                probability,
                status_id
            } = req.body
            const payload = {
                product,
                value,
                probability,
                status_id,
                org_id,
                lead_id: id
            }
            const leads = await createLeadOpportunity(payload)
            return successResponseWithData(res, statusCode.created, 'Lead Opportunity created successful', leads)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    createOrganizationLeadStatus: async (req, res) => {
        try {
            const {
                org_id
            } = req.userData
            const { name } = req.body
            const payload = {
                name,
                org_id
            }
            await createOrganizationStatus(payload)
            return successResponse(res, statusCode.created, 'Organization Status created')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    getOrganizationLeadStatus: async (req, res) => {
        try {
            const { org_id } = req.userData
            const lead = await fetchOrganizationStatusService(org_id)
            return successResponseWithData(res, statusCode.success, 'Organization lead status', lead)
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    createActivity: async (req, res) => {
        try {
            const { org_id } = req.userData
            const {id} = req.params
            const {type, note, meeting_date} = req.body
            const payload = {
                org_id,
                lead_id: id,
                type,
                note, 
                meeting_date
            }

            const activity = await createLeadActivity(payload)
            return successResponse(res, statusCode.created, 'Lead activity created')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    }, 
    updateActivity: async (req, res) => {
        try {
            const {id} = req.params
            const { org_id } = req.userData
            const {type, note, meeting_date, lead_id} = req.body
            console.log(id, 'id');
            const payload = {
                type,
                note, 
                meeting_date,
                org_id,
                
            }
            await updateLeadActivity(payload, id)
            return successResponse(res, statusCode.success, 'Lead activity updated')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    deleteActivity: async (req, res) => {
        try {
            const { id } = req.params

            await deleteLeadActivity(id)
            return successResponse(res, statusCode.success, 'Lead activity deleted successfully')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    getLeadActivity: async (req, res) => {
        try {
            const  { id } = req.params
            const leadActivities = await fetchLeadActivityById(id)
            return successResponseWithData(res, statusCode.success, 'Lead activity successful', leadActivities)    
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    getLeadContact: async (req, res) => {
        try {
            const  { id } = req.params
            const leadContact = await fetchLeadContactById(id)
            return successResponseWithData(res, statusCode.success, 'Lead contact successful', leadContact)    
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    createContact: async (req, res) => {
        try {
            const { org_id } = req.userData
            const {id} = req.params
            const {name, position, email, phone_number} = req.body
            const payload = {
                org_id,
                lead_id: id,
                name,
                position,
                email,
                phone_number
            }

            console.log(payload, 'payload');

            const activity = await createLeadContact(payload)
            return successResponse(res, statusCode.created, 'Lead contact created')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    }, 
    updateContact: async (req, res) => {
        try {
            const {id} = req.params
            const {name, position, email, phone_number} = req.body
            const payload = {
                name,
                position,
                email,
                phone_number
            }
            await updateLeadContact(payload, id)
            return successResponse(res, statusCode.success, 'Lead contact updated')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    deleteContact: async (req, res) => {
        try {
            const { id } = req.params

            await deleteLeadContact(id)
            return successResponse(res, statusCode.success, 'Lead contact deleted successfully')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    updateOpportunity: async (req, res) => {
        try {
            const {id} = req.params
            const {
                product,
                value,
                probability,
                status_id
            } = req.body
            const payload = {
                product,
                value,
                probability,
                status_id,
            }
            await updateLeadOpportunity(payload, id)
            return successResponse(res, statusCode.success, 'Lead Opportunity updated')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    deleteOpportunity: async (req, res) => {
        try {
            const { id } = req.params

            await deleteLeadOpportunity(id)
            return successResponse(res, statusCode.success, 'Lead Opportunity deleted successfully')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    deleteLeadRequest: async (req, res) => {
        try {
            const { id } = req.params

            await deleteLead(id)
            return successResponse(res, statusCode.success, 'Lead deleted successfully')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    updateLeadRequest: async (req, res) => {
        try {
            const {id} = req.params
            const {
                name,
                source,
                status
            } = req.body
            const payload = {
                name,
                source,
                status
            }
            await updateLead(payload, id)
            return successResponse(res, statusCode.success, 'Lead updated')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
}