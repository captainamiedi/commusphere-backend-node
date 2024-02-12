import models from '../models/index.js'

const  {Organisation} = models

export const createOrg = async (orgObj) => {
    try {
        const org = await Organisation.create(orgObj)
        return org
    } catch (error) {
        throw error
    }
}

export const findOrgByEmail = async (email) => {
    try {
        return await Organisation.findOne({where: {email}})
    } catch (error) {
       throw error 
    }
}

export const findOrgById = async (id) => {
    try {
        return await Organisation.findOne({where: {id}})
    } catch (error) {
       throw error 
    }
}