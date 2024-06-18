import models from '../models/index.js'

const { OrganizationLeadSetting } = models

export const createTemplateSettingService = async (settingObj) => {
    try {
        const messagingSetting = await OrganizationLeadSetting.create(settingObj)
        return messagingSetting
    } catch (error) {
        throw error
    }
}

export const updateTemplateSettingService = async (settingId, settingObj) => {
    try {
        const messagingSetting = await OrganizationLeadSetting.update(settingObj,  {
            where: { id: settingId}
        })
        return messagingSetting
    } catch (error) {
        throw error
    }
}
export const findById = async (settingId) => {
    try {
        const messagingSetting = await OrganizationLeadSetting.findByPk(settingId)
        return messagingSetting
    } catch (error) {
        throw error
    }
}

export const deleteTemplateSettingService = async (settingId) => {
    try {
        const messagingSetting = await OrganizationLeadSetting.destroy({
            where: { id: settingId}
        })
        return messagingSetting
    } catch (error) {
        throw error
    }
}