import { createSocialDetails, findSocialByOrgId } from "../Service/socailService.js";
import { SCOPES, authorize, listLabels, oauth2Client } from "../config/googleConfig.js"
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import { google } from 'googleapis'

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
        console.log(req.query, 'auth query');
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
    },
    sendGmailMessage: async (req, res) => {
        try {
            const { subject, messageBody, to, from } = req.body
            const { org_id, email } = req.userData

            const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
            const messageParts = [
              `From: ${from || email}`,
              `To: ${to}`,
              'Content-Type: text/html; charset=utf-8',
              'MIME-Version: 1.0',
              `Subject: ${utf8Subject}`,
              '',
              messageBody
            ];;
            const message = messageParts.join('\n');

            // The body needs to be base64url encoded.
            const encodedMessage = Buffer.from(message)
              .toString('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=+$/, '');
            
            const gmail = google.gmail('v1');
            const googleToken = await findSocialByOrgId(org_id, 'google')
            oauth2Client.setCredentials(googleToken.social_metadata)
            const response = await gmail.users.messages.send({
                auth: oauth2Client,
                requestBody: {
                    raw: encodedMessage,
                }
            })
            return successResponseWithData(res, statusCode.success, 'Message sent', response)
        } catch (error) {
           console.log(error, 'send message error'); 
           return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    watchGmailMessage: async (org_id) => {
        try {
            const googleToken = await findSocialByOrgId(org_id, 'google')
            oauth2Client.setCredentials(googleToken.social_metadata)
            const response = await gmail.users.watch({
                auth: oauth2Client,
                requestBody: {
                    topicName: 'projects/commusphere/topics/MyTopic'
                }
            }) 

            console.log(response, 'watch api response');
        } catch (error) {
            console.log(error, 'watch message error'); 
           return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    }
}