import { createSocialDetails } from "../Service/socailService.js";
import { SCOPES, authorize, listLabels, oauth2Client } from "../config/googleConfig.js"
import { errorResponse, successResponse } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";

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
    }, 

    getOauthToken: async (req, res) => {
        const code = req.query.code;
        const {org_id} = req.userData
        try {
          const { tokens } = await oauth2Client.getToken(code);
        //   oauth2Client.setCredentials(tokens);
          console.log(tokens, 'token');
          const payload = {
            name: 'google',
            org_id,
            social_metadata: tokens
          }
          
          await createSocialDetails(payload)
         return successResponse(res, statusCode.created, 'Operation successfull')
        } catch (error) {
          console.error('Error retrieving access token', error);
          return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    googleAuth: async (req, res) => {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
          });
          res.redirect(authUrl);
    }

}