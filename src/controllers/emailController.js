import { createVariableService, getVariableService } from "../Service/emailTemplateService.js";
import { DKIMRecordsLookup, generateDKIMRecords } from "../utils/email.js"
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import dns2 from "dns2";
// import { dns } from "googleapis/build/src/apis/dns/index.js";

export default {
    getDomainKey: async(req, res) => {
        try {
            const { domain } = req.params
            const domainKeys = await generateDKIMRecords(domain)
            console.log(domainKeys, 'domain keys');
            return successResponseWithData(res, statusCode.success, 'DKIM Keys fetched', domainKeys)
        } catch (error) {
            throw error
        }
    },
    dkimLookup: async(req, res) => {
        try {
            const { domain } = req.params
            const domainKeys = await DKIMRecordsLookup(domain)
            console.log(domainKeys, 'domain keys');
            return successResponseWithData(res, statusCode.success, 'DKIM Lookup successful', domainKeys)
        } catch (error) {
            throw error
        }
    },
    dnsLookup: async (req, res) => {
        try {
            const dns = new dns2()
            const result = await dns.resolveA('norebase.com');
            // const result1 = await dns.
            console.log(result.answers);
        } catch (error) {
            throw error
        }
    },
    createVariable: async (req, res) => {
        try {
            const {key, value, type} = req.body
            const {org_id} = req.userData
            const payload = {
                key, value, org_id, type
            }
            await createVariableService(payload)
            return successResponse(res, statusCode.created, 'Variable created')
        } catch (error) {
          return errorResponse(res, error.status || statusCode.serverError, error)  
        }
    },
    getOrgVariable: async (req, res) => {
        try {
            const {org_id} = req.userData
            const variables = await getVariableService(org_id)
            return successResponseWithData(res, statusCode.success, 'Variable fetched', variables)
        } catch (error) {
          return errorResponse(res, error.status || statusCode.serverError, error)  
        }
    },
}