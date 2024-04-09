import { generateDKIMRecords } from "../utils/email.js"

export default {
    getDomainKey: async(req, res) => {
        try {
            const { domain } = req.params
            const domainKeys = await generateDKIMRecords(domain)
            console.log(domainKeys, 'domain keys');
        } catch (error) {
            throw error
        }
    }
}