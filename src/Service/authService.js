import models from '../models/index.js'
// import { compareSync } from 'bcryptjs';
import { createUser } from './user.js';
import { createOrg, findOrgByEmail } from './organization.js';

const { User } = models

export const signupService = async (userObj, orgObj) => {
    try {
        const getOrgEmail = await findOrgByEmail(orgObj.org_email)
        let orgRes
        if (getOrgEmail === null || getOrgEmail === undefined) {
            orgRes = await createOrg(orgObj)
        } else  {
            orgRes = getOrgEmail
        }
        const payload = {...userObj}
        payload['org_id'] = orgRes.dataValues.id
        const userRes = await createUser(payload)
        return {
            userRes,
            orgRes
        };
    } catch (error) {
        throw error
    }
}