import models from '../models/index.js'

const {socialMedia} = models

export const createSocialDetails = async (socialObj) => {
    try {
        const social = await socialMedia.create(socialObj)
        return social
    } catch (error) {
        throw error
    }
}

export const findSocialByOrgId = async (org_id, name) => {
    try {
        const social = await socialMedia.findAll({
            where: {
                org_id,
                name
            }
        })
        return social
    } catch (error) {
        throw error
    }
}