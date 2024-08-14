import models from '../models/index.js'


const { Surveries, User, SurveyTemplate , SurveryComments} = models

export const createSurvey =async (surveyObj) => {
    try {
        const survey = await Surveries.create(surveyObj)
        return survey
    } catch (error) {
       throw error 
    }
}

export const updateSurvey =async (surveyObj, id) => {
    try {
        const survey = await Surveries.update(surveyObj, {
            where: {
                id
            }
        })
        return survey
    } catch (error) {
       throw error 
    }
}

export const fetchAllSurvey = async (org_id) => {
    try {
        const survey = await Surveries.findAll({
            where: {
                org_id
            },
            include: [
                {
                    model: User,
                    as: 'User'
                }, 
            ]
        })
        return survey
    } catch (error) {
       throw error 
    }
}

export const fetchSurveyById = async (id) => {
    try {
        const survey = await Surveries.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'User'
                }, 
            ]
        })
        return survey
    } catch (error) {
       throw error 
    }
}

export const deleteSurvey = async (id) => {
    try {
        const survey = await Survey.destroy({
            where: {
                id
            }
        })
        return survey
    } catch (error) {
       throw error 
    } 
}

export const createSurveyTemplate = async (templateObj) => {
    try {
        const survey = await SurveyTemplate.create(templateObj)
        return survey
    } catch (error) {
       throw error 
    } 
}

export const fetchAllTemplate = async () => {
    try {
        const survey = await SurveyTemplate.findAll()
        return survey
    } catch (error) {
       throw error 
    } 
}

export const fetchCommentForSurvey = async (id, surveyId) => {
    try {
        const survey = await SurveryComments.findAll({
            where:  {
                user_id: id,
                survey_id: surveyId
            },
            include: [
                {
                    model: User,
                    as: 'User'
                }, 
            ]
        })
        return survey
    } catch (error) {
       throw error 
    } 
}

export const createSurveyComment = async (commentObj) => {
    try {
        const survey = await SurveryComments.create(commentObj)
        return survey
    } catch (error) {
       throw error 
    } 
}