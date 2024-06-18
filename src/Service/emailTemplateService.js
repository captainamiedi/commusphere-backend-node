import models from '../models/index.js'

const { OrganizationMessagingTemplate } = models


export const createEmailTemplateService = async (emailObj) => {
    try {
        const emailTemplate = await OrganizationMessagingTemplate.create(emailObj)
        return emailTemplate
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getTemplateById = async (id) => {
    try {
        const emailTemplate = await OrganizationMessagingTemplate.findByPk(id)
        return emailTemplate
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getEmailTemplateForOrgService = async (id) => {
    try {
        const emailTemplate = await OrganizationMessagingTemplate.findAll({
            where: { org_id: id}
        })
        return emailTemplate
    } catch (error) {
        console.log(error);
        throw error
    }
}
export const updateEmailTemplateForOrgService = async (id, emailObj) => {
    try {
        const emailTemplate = await OrganizationMessagingTemplate.update(emailObj , {
            where: {id}
        })
        return emailTemplate
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteEmailTemplateForOrgService = async (id) => {
    try {
        const emailTemplate = await OrganizationMessagingTemplate.destroy({
            where: { id}
        })
        return emailTemplate
    } catch (error) {
        console.log(error);
        throw error
    }
}