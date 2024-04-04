import fs from 'fs/promises'
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import readline from 'readline'
import dotenv from 'dotenv';
// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

dotenv.config();

// If modifying these scopes, delete token.json.
export const SCOPES = ["https://mail.google.com/",
"https://www.googleapis.com/auth/gmail.addons.current.message.action",
"https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
"https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
"https://www.googleapis.com/auth/gmail.modify",
"https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOPIC_NAME = 'projects/commusphere/topics/MyTopic';

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

// authorize().then(listLabels).catch(console.error);

// Connect to Pub Sub
export async function connectPubSub(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.watch({
      userId: 'me',
      requestBody: {
          'labelIds': ['INBOX'],
          topicName: TOPIC_NAME
      },
  });
  console.log(JSON.stringify(res.data));
}

// Function to log the data object to the console
function logCompleteJsonObject(jsonObject) {
  console.log(JSON.stringify(jsonObject, null, 4));
}

// Get history details based on history ID
async function getHistory(auth, historyId) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.history.list({
      userId: 'me',
      startHistoryId: historyId
  })
  console.log(JSON.stringify(res.data));
  // The main part of the response comes
  // in the "data" attribute.
  logCompleteJsonObject(res.data);
}

// Call the API to get message
async function getMessage(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({
      userId: 'me',
      id: messageId
  })
  logCompleteJsonObject(res.data);
}

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8080/api/v1/oauth2callback'
);

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: SCOPES
});

google.options({auth: oauth2Client});

let cred = await loadSavedCredentialsIfExist();
// connectPubSub()
// let messageId = '18c551696204d6e3';
// await getMessage(cred, messageId);