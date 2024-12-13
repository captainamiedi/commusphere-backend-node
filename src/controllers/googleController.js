import { response } from "express";
import { processGmailNotification } from "../Service/googleService.js";
import { createSocialDetails, findSocialByEmail, findSocialByOrgId, updateSocial } from "../Service/socailService.js";
import { SCOPES, authorize, oauth2Client } from "../config/googleConfig.js";
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import { google } from 'googleapis';

export default {
    getUserAuthorization: async (req, res) => {
        try {
            const labels = await authorize().then(listLabels);
            return successResponseWithData(res, statusCode.success, 'Labels retrieved successfully', labels);
        } catch (error) {
            console.error('Error in getUserAuthorization:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to authorize user');
        }
    },

    oauth2callback: async (req, res) => {
        try {
            console.log(req.query, 'Callback request query');
            // Implement callback handling logic here.
        } catch (error) {
            console.error('Error in oauth2callback:', error);
            return errorResponse(res, statusCode.serverError, 'OAuth2 callback failed');
        }
    },

    gmailPushWebhook: async (req, res) => {
        try {
            const message = req.body.message;

            // Decode the Pub/Sub message
            const decodedMessage = Buffer.from(message.data, 'base64').toString('utf-8');
            const notificationData = JSON.parse(decodedMessage);
            console.log(notificationData, 'notification data');
            

            const email = notificationData.emailAddress;
            const historyId = notificationData.historyId;

            const socialData = await findSocialByEmail(email)

            console.log(`Received webhook for email: ${email}, historyId: ${historyId}`);

            // Process the received message
            await processGmailNotification(socialData, historyId);

            // Acknowledge receipt of the webhook
            return successResponse(res, statusCode.success, 'Webhook received and processed successfully');
        } catch (error) {
            console.error('Error in gmailPushWebhook:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to process webhook');
        }
    },

    shopbobPushWebhook: async (req, res) => {
        try {
            const message = req.body.message;
            console.log(message, 'message');
            console.log(req.body, 'message body');
            
            // Decode the Pub/Sub message
            const decodedMessage = Buffer.from(message.data, 'base64').toString('utf-8');
            const notificationData = JSON.parse(decodedMessage);
            console.log(notificationData, 'notification data');
            

            // const email = notificationData.emailAddress;
            // const historyId = notificationData.historyId;

            // const socialData = await findSocialByEmail(email)

            // console.log(`Received webhook for email: ${email}, historyId: ${historyId}`);

            // // Process the received message
            // await processGmailNotification(socialData, historyId);

            // Acknowledge receipt of the webhook
            return successResponse(res, statusCode.success, 'Webhook received and processed successfully');
        } catch (error) {
            console.error('Error in gmailPushWebhook:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to process webhook');
        }
    },

    getOauthToken: async (req, res) => {
        console.log('Received request for OAuth token');
        const code = req.query.code;
        const { org_id } = req.userData;
        
        try {
            const { tokens } = await oauth2Client.getToken(code);
            console.log('OAuth tokens received:', tokens);
            oauth2Client.setCredentials(tokens);
            const gmail = google.gmail({version: 'v1', auth: oAuth2Client});
            const profile = await gmail.users.getProfile({userId: 'me'});
            const email = profile.data.emailAddress;
            const payload = {
                name: 'google',
                org_id,
                social_metadata: tokens,
                connected_email: email
            };

            await createSocialDetails(payload);
            // Optionally, start watching for Gmail messages after token creation.
            // await this.watchGmailMessage(org_id);

            return successResponse(res, statusCode.created, 'OAuth token obtained successfully');
        } catch (error) {
            console.error('Error retrieving OAuth token:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to obtain OAuth token');
        }
    },

    googleAuth: async (req, res) => {
        try {
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            console.log('Generated Google OAuth URL:', authUrl);
            return successResponseWithData(res, statusCode.success, 'URL generated successfully', authUrl);
        } catch (error) {
            console.error('Error generating Google OAuth URL:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to generate OAuth URL');
        }
    },

    sendGmailMessage: async (req, res) => {
        try {
            const { subject, messageBody, to } = req.body;
            const { org_id, email } = req.userData;

            const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
            const messageParts = [
                `From: ${email}`,
                `To: ${to}`,
                'Content-Type: text/html; charset=utf-8',
                'MIME-Version: 1.0',
                `Subject: ${utf8Subject}`,
                '',
                messageBody,
            ];
            const message = messageParts.join('\n');

            // The body needs to be base64url encoded.
            const encodedMessage = Buffer.from(message)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            const googleToken = await findSocialByOrgId(org_id, 'google');
            oauth2Client.setCredentials(googleToken.dataValues.social_metadata);

            const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
            const response = await gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: encodedMessage,
                },
            });

            return successResponseWithData(res, statusCode.success, 'Message sent successfully', response.data);
        } catch (error) {
            console.error('Error sending Gmail message:', error);
            return errorResponse(res, statusCode.serverError, 'Failed to send message');
        }
    },

    watchGmailMessage: async (req, res) => {
        try {
            const { org_id } = req.userData;
            const googleToken = await findSocialByOrgId(org_id, 'google');
            oauth2Client.setCredentials(googleToken.dataValues.social_metadata);

            const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
            const response = await gmail.users.watch({
                userId: 'me',
                requestBody: {
                    labelIds: ['INBOX'],
                    topicName: 'projects/commusphere/topics/MyTopic',
                },
            });
            const temp = {
                ...googleToken.dataValues,
                watch_id: response.data.historyId
            }
            // temp.social_metadata = {...temp.social_metadata, ...response.data}
            console.log('Watch API response:', response.data);
            await updateSocial(org_id, temp)
            return successResponseWithData(res, statusCode.success, 'Watch successfully', response.data);
            return response.data;
        } catch (error) {
            console.error('Error setting up Gmail watch:', error);
            return errorResponse(null, statusCode.serverError, 'Failed to set up Gmail watch');
        }
    },
};
