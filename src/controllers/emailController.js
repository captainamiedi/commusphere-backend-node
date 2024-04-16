import { DKIMRecordsLookup, generateDKIMRecords } from "../utils/email.js"
import { successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";

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
}