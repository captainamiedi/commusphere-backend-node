import models from '../models/index.js'

const {Lead, LeadActivity, LeadContact, LeadOpportunity, LeadStatus, OrganizationLeadStatus, OrganizationLeadSetting} = models


export const fetchLeadsByOrg = async (id) => {
    try {
        let leads
        // leads = await fetchLeadsByOrgId(id)
        // if (leads.length === 0) {
        //     return leads
        // }
        leads = await Lead.findAll({
            where: {
                org_id: id
            },
            include: [
                // {
                //     model: LeadStatus,
                //     as: 'leadStatus'
                // }, 
                {
                    model: LeadContact,
                    as: 'leadContact'
                }, 
                {
                    model: LeadOpportunity,
                    as: 'leadOpportunity'
                }, 
                {
                    model: LeadActivity,
                    as: 'leadActivities'
                }, 
            ],
            order: [
                ['createdAt', 'ASC']
            ]
        })
        return leads
    } catch (error) {
        throw error
    }
}
export const fetchLeadsById = async (id) => {
    try {
        const lead = await Lead.findByPk(id, {
            include: [
                {
                    model: LeadContact,
                    as: 'leadContact'
                }, 
                {
                    model: LeadOpportunity,
                    as: 'leadOpportunity'
                }, 
                {
                    model: LeadActivity,
                    as: 'leadActivities'
                }, 
            ],
        })
        return lead
    } catch (error) {
        throw error
    }
}
export const fetchLeadsByOrgId = async (id) => {
    try {
        const lead = await Lead.findAll({
            where: {
                org_id: id
            }
        })
        return lead
    } catch (error) {
        throw error
    }
}

export const createLead = async (leadObj) => {
    try {
        const lead = await Lead.create(leadObj)
        return lead
    } catch (error) {
        throw error
    }
}
export const updateLead = async (leadObj, id) => {
    try {
        const lead = await Lead.update(leadObj, {
            where: {
                id
            }
        })
        return lead
    } catch (error) {
        throw error
    }
}

export const deleteLead = async (id) => {
    try {
        const lead = await Lead.destroy({
            where: {
                id
            }
        })
        return lead
    } catch (error) {
        throw error
    }
}

export const fetchOpportunityById = async (id) => {
    try {
        const opportunity = await LeadOpportunity.findByPk(id)
        return opportunity
    } catch (error) {
        throw error
    }
}

export const createLeadOpportunity = async (leadObj) => {
    try {
        const opportunity = await LeadOpportunity.create(leadObj)
        return opportunity
    } catch (error) {
        throw error
    }
}
export const updateLeadOpportunity = async (leadObj, id) => {
    try {
        const opportunity = await LeadOpportunity.update(leadObj, {
            where: {
                id
            }
        })
        return opportunity
    } catch (error) {
        throw error
    }
}

export const deleteLeadOpportunity = async (id) => {
    try {
        const opportunity = await LeadOpportunity.destroy({
            where: {
                id
            }
        })
        return opportunity
    } catch (error) {
        throw error
    }
}

export const fetchLeadActivityById = async (id) => {
    try {
        const activity = await LeadActivity.findByPk(id)
        return activity
    } catch (error) {
        throw error
    }
}

export const createLeadActivity = async (leadObj) => {
    try {
        const activity = await LeadActivity.create(leadObj)
        return activity
    } catch (error) {
        throw error
    }
}
export const updateLeadActivity = async (leadObj, id) => {
    try {
        console.log(leadObj, 'update');
        const activity = await LeadActivity.update(leadObj, {
            where: {
                id: id
            }
        });
        console.log(activity, 'active');
        return activity;
    } catch (error) {
        throw error;
    }
};


export const deleteLeadActivity = async (id) => {
    try {
        const activity = await LeadActivity.destroy({
            where: {
                id
            }
        })
        return activity
    } catch (error) {
        throw error
    }
}

export const fetchLeadContactById = async (id) => {
    try {
        const contact = await LeadContact.findByPk(id)
        return contact
    } catch (error) {
        throw error
    }
}

export const createLeadContact = async (leadObj) => {
    try {
        const contact = await LeadContact.create(leadObj)
        return contact
    } catch (error) {
        throw error
    }
}
export const updateLeadContact = async (leadObj, id) => {
    try {
        const activity = await LeadContact.update(leadObj, {
            where: {
                id
            }
        })
        return activity
    } catch (error) {
        throw error
    }
}

export const deleteLeadContact = async (id) => {
    try {
        const activity = await LeadContact.destroy({
            where: {
                id
            }
        })
        return activity
    } catch (error) {
        throw error
    }
}

export const createOrganizationStatus = async (leadObj) => {
    try {
        const contact = await OrganizationLeadStatus.create(leadObj)
        return contact
    } catch (error) {
        throw error
    }
}

export const fetchOrganizationStatusService = async (id) => {
    try {
        const contact = await OrganizationLeadStatus.findAll({
            where: {
                org_id: id
            }
        })
        return contact
    } catch (error) {
        throw error
    }
}

export const fetchLeadOpportunityService = async (id, org_id, lead_id) => {
    try {
        const contact = await LeadContact.findAll({
            where : {
                lead_id  
            },
        })
        const opportunity = await LeadOpportunity.findByPk(id, {
            include: [
                {
                    model: OrganizationLeadSetting,
                    as: 'OrganizationLeadSetting'
                }, 
            ],
        })
        return {opportunity, contact}
    } catch (error) {
        console.log(error);
        throw error
    }
}