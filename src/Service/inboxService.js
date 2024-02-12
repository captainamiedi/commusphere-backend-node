import models from '../models/index.js'

const {Inbox} = models

export const createInboxService = async (inboxObj) => {
    try {
        const inboxRes = await Inbox.create(inboxObj)
        return inboxRes
    } catch (error) {
        console.log(error);
    }
}

export const getInboxService = async (id) => {
    try {
        const inboxRes = await Inbox.findAll({where: {
            org_id: id
        }})
        return inboxRes
    } catch (error) {
        console.log(error);
    }
}
export const editInboxService = async (id,inboxObj) => {
    try {
        const inboxRes = await Inbox.update({inboxObj}, {where: {
            id
        }})
        return inboxRes
    } catch (error) {
        console.log(error);
    }
}

export const deleteInboxService = async (id) => {
    try {
        const inboxRes = await Inbox.destroy({
            where: {
                id
            }
        })
        return inboxRes
    } catch (error) {
        console.log(error);
    }
}