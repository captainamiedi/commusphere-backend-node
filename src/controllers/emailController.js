import { createEmailConfigService, fetchConfigService } from "../Service/emailConfigService.js";
import { createVariableService, getVariableService } from "../Service/emailTemplateService.js";
import { dkimLookup, DKIMRecordsGenerate, DKIMRecordsLookup, generateDKIMRecords, nodemailerTransport } from "../utils/email.js"
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
    dkimGenerator: async(req, res) => {
        try {
            const { domain } = req.params
            const domainKeys = await DKIMRecordsGenerate(domain)
            return successResponseWithData(res, statusCode.success, 'DKIM Generation successful', domainKeys)
        } catch (error) {
            return errorResponse(res, error.status || statusCode.serverError, error)  
        }
    },
    dkimLookupRequest: async(req, res) => {
        try {
            const { domain, selector, recordTxt, recordValue, pubKey, privKey } = req.body
            const { org_id } = req.userData
            const domainKeys = await dkimLookup(domain)
            if (domainKeys.record.toLowerCase() == 'valid' && recordValue == domainKeys.record) {
                const payload = {
                    selector,
                    domain,
                    private_key: privKey,
                    public_key: pubKey,
                    recordTxt,
                    recordValue,
                    org_id,
                    is_valid: true
                }
                await createEmailConfigService(payload)
                return successResponse(res, statusCode.success, 'DKIM lookup successful')
            }else {
                return successResponse(res, statusCode.success,  "DKIM record not found.")
            }
        } catch (error) {
            return errorResponse(res, error.status || statusCode.serverError, error)  
        }
    },
    sendMail: async (req, res) => {
        try {
            const { org_id } = req.userData
            const emailConfig = await fetchConfigService(org_id)
            if (emailConfig.is_valid) {
                const data = {
                    private_key: emailConfig.private_key,
                    domain: emailConfig.domain
                }
                const transporter = nodemailerTransport(data)
                const message = {
                    from: 'bright@scantopay.com',
                    to: 'captainamiedi1@gmail.com',
                    subject: 'testing',
                    html: 'this is testing message'
                }
                transporter.sendMail(message, function (err, info) {
                    if (err) {
                        console.log(err);
                        return errorResponse(res, statusCode.badRequest, err)
                      // check if htmlstream is still open and close it to clean up
                    }
                    return successResponse(res, statusCode.success, 'Email sent successfully')
                })

            } else {
                return errorResponse(res, statusCode.badRequest, 'Email Authenitcation is not complete')
            }
            
        } catch (error) {
            throw error
        }
    }
}