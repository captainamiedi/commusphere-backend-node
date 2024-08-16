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

export async function processGmailNotification(googleToken) {
    try {
        // Retrieve stored OAuth credentials using the email or org_id
        // const googleToken = await findSocialByOrgId('2a8c71b9-da73-4f0f-a434-ca4a6ea70756', 'google');
        oauth2Client.setCredentials(googleToken.dataValues.social_metadata);
        console.log(googleToken, 'process token data');
        
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        // Retrieve the list of history records for the user starting from historyId
        const response = await gmail.users.history.list({
            userId: 'me',
            startHistoryId: googleToken.dataValues.watch_id,
            // labelId: ['INBOX'],
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
                    const headers = message.data.payload.headers;
                    let senderEmail = "";
                    let subject = "";
                    let receiverEmail = "";
                    let emailContent = "";
                    // Loop through the headers to find the sender, subject, and receiver
                    headers.forEach(header => {
                        if (header.name === "From") {
                        senderEmail = header.value;
                        }
                        if (header.name === "Subject") {
                        subject = header.value;
                        }
                        if (header.name === "To") {
                        receiverEmail = header.value;
                        }
                    });
                    // Extract the email content (plain text and HTML)
                    const parts = message.data.payload.parts;
                    parts.forEach(part => {
                    if (part.mimeType === "text/plain") {
                        const decodedBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
                        emailContent += decodedBody;
                    } else if (part.mimeType === "text/html") {
                        const decodedBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
                        emailContent += decodedBody;
                    }
                    });
                    const payload = {
                        channel: 'gmail',
                        status: 'New',
                        body: emailContent,
                        subject: subject,
                        org_id: googleToken.dataValues.org_id,
                        sender: senderEmail
                    }
                    global._io.emit(`newEmail_${googleToken.dataValues.org_id}`, payload);
                    await createMessage(payload)
                }
            }
        }
    } catch (error) {
        console.error('Error processing Gmail notification:', error);
    }
}