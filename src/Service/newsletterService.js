import models from '../models/index.js'

const {Newsletters, Subscribers, SubscribersNewsletter, Templates, NewsletterTemplates} = models

export const createSubscriber = async (subscribersObj) => {
    try {
        const subscriber = await Subscribers.create(subscribersObj)
        return subscriber;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const createTemplate = async (templateObj) => {
    try {
        const template = await Templates.create(templateObj)
        return template
    } catch (error) {
        throw error
    }
}

export const createNewsletter = async (newsletterObj) => {
    try {
        const newsletter = await Newsletters.create(newsletterObj)
        return newsletter
    } catch (error) {
        throw error
    }
}

export const sendNewsletter = async () => {
    try {
        
    } catch (error) {
        throw error
    }
}

export const createSubscriberNewsletter = async () => {
    try {
        
    } catch (error) {
        
    }
}