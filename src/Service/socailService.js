import models from '../models/index.js'

const {socialMedia} = models

export const createSocialDetails = async (socialObj) => {
    try {
        const socials = await socialMedia.findOne({
            where: {org_id: socialObj.org_id, name: socialObj.name}
        })
        if (!socials) {
            return await socialMedia.create(socialObj)
        }
        const social = await socialMedia.update(socialObj, {
            where: {org_id: socialObj.org_id}
        })
        return social
    } catch (error) {
        throw error
    }
}

export const findSocialByOrgId = async (org_id, name) => {
    try {
        const social = await socialMedia.findOne({
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

export const updateSocial = async (org_id, payload) => {
    try {
        const social = await socialMedia.update(payload, {
            where: {
                org_id
            }
        })
        return social
    } catch (error) {
        
    }
}