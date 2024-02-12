import { authorize, listLabels } from "../config/googleConfig.js"

export default {
    getUserAuthorization: async (req, res) => {
        try {
            authorize().then(listLabels)
        } catch (error) {
            console.log(error);
        }
    },

    oauth2callback: async (req, res) => {
        try {
            console.log(req, 'callback request');
        } catch (error) {
           console.log(error, 'handle error'); 
        }
    },
    gmailPushWebhook: async (req, res) => {
        try {
            console.log(req.body, 'webhook book')
            console.log(req, 'webhook request');
        } catch (error) {
            console.log(error)
        }
    }
}