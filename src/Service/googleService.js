import { google } from "googleapis";
import { oauth2Client } from "../config/googleConfig.js";
import models from '../models/index.js'
import { findSocialByOrgId } from "./socailService.js";

const {Message} = models

export const createMessage = async (socialObj) => {
    try {
        return await Message.create(socialObj)
    } catch (error) {
        throw error
    }
}

export async function processGmailNotification(email, historyId) {
    try {
        // Retrieve stored OAuth credentials using the email or org_id
        const googleToken = await findSocialByOrgId('2a8c71b9-da73-4f0f-a434-ca4a6ea70756', 'google');
        oauth2Client.setCredentials(googleToken.dataValues.social_metadata);

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        // Retrieve the list of history records for the user starting from historyId
        const response = await gmail.users.history.list({
            userId: 'me',
            startHistoryId: historyId,
            labelId: ['INBOX'],
        });

        console.log(response, 'process response');
        

        const historyRecords = response.data.history || [];

        // Process each history record (e.g., new emails)
        for (const record of historyRecords) {
            if (record.messagesAdded) {
                for (const messageAdded of record.messagesAdded) {
                    const messageId = messageAdded.message.id;
                    const message = await gmail.users.messages.get({ userId: 'me', id: messageId });
                    console.log(`New email received: ${message.data.snippet}`);
                    // Implement further processing of the message
                    const payload = {
                        channel: 'gmail',
                        status: 'New',
                        body: JSON.stringify(message),
                        subject: messageId,
                        org_id: '2a8c71b9-da73-4f0f-a434-ca4a6ea70756',
                        sender: email
                    }
                    await createMessage(payload)
                }
            }
        }
    } catch (error) {
        console.error('Error processing Gmail notification:', error);
    }
}