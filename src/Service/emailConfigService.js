import models from '../models/index.js'

const {EmailConfig} = models

export const createEmailConfigService =async (configObj) => {
    try {
        const config = await EmailConfig.create(configObj)
        return config
    } catch (error) {
       throw err 
    }
}

export const fetchConfigService =async (id) => {
    try {
        const config = await EmailConfig.findOne({where: {ord_id: id}})
        return config
    } catch (error) {
       throw err 
    }
}