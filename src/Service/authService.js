import models from '../models/index.js'
// import { compareSync } from 'bcryptjs';
import { createUser } from './user.js';
import { createOrg } from './organization.js';

const { User } = models

export const signupService = async (userObj, orgObj) => {
    try {
        const orgRes = await createOrg(orgObj)
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