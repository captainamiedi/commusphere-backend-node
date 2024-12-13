import axios from "axios"
import { metaConfig } from "../config/metaConfig.js";
import { createSocialDetails, findSocialByOrgId, updateSocial } from "./socailService.js";

export const getPageAccessToken =async (userId, access_token) => {
    try {
        // https://graph.facebook.com/{your-user-id}/accounts?access_token={user-access-token}
        const response = await axios.get(`https://graph.facebook.com/${userId}/accounts?access_token=${access_token}`)
        console.log(response.data, 'response data');
        console.log(response, 'response');
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const getAppAccessToken =async () => {
    try {

    } catch (error) {
        
    }
}

export const setPageSubscriptions = async (org_id, name, subscriptions) => {
    try {
      const metaSocial = await findSocialByOrgId(org_id, name)
      const {baseUrl} = metaConfig
        let url = new URL(`${baseUrl}${metaSocial.social_metadata.id}/subscribed_apps`);
        url.search = new URLSearchParams({
          access_token: metaSocial.social_metadata.access_token,
          subscribed_fields: subscriptions
        });
        let response = await fetch(url, {
            method: "POST"
          });
          if (response.ok) {
            console.log(`Page subscriptions have been set.`);
          } else {
            console.warn(`Error setting page subscriptions`, response.statusText);
          }
    } catch (error) {
        throw error
    }
}

export const callSendApi =async (requestBody, org_id, name) => {
  try {
    const metaSocial = await findSocialByOrgId(org_id, name)
    const {baseUrl} = metaConfig
    let url = new URL(`${baseUrl}me/messages`);
    url.search = new URLSearchParams({
      access_token: metaSocial.social_metadata.access_token
    });
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      console.warn(`Could not sent message.`, response.statusText);
    }

  } catch (error) {
    throw error
  }
}

export const getUserProfile =async (senderIgsid) => {
  let url = new URL(`${config.apiUrl}/${senderIgsid}`);
    url.search = new URLSearchParams({
      access_token: config.pageAccesToken,
      fields: "name,profile_pic"
    });
    let response = await fetch(url);
    if (response.ok) {
      let userProfile = await response.json();
      return {
        name: userProfile.name,
        profilePic: userProfile.profile_pic
      };
    } else {
      console.warn(
        `Could not load profile for ${senderIgsid}: ${response.statusText}`
      );
      return null;
    }
}

export const getLongLiveAccessToken = async (access_token) => {
  try {
    if (!access_token) {
      throw Error('Access token not found')
    }
    const {baseUrl} = metaConfig
    const {META_APP_ID, META_APP_SECRET} = process.env
    const url = `${baseUrl}oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}& fb_exchange_token=${access_token}`
    const response = await axios.get(url)
    const payload = {
      name: 'meta_user',
      org_id,
      social_metadata: response.data
    }
    
    await createSocialDetails(payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getLongLivePageAccessToken = async (id, longLiveAccessToken, org_id) => {
  try {
    const {baseUrl} = metaConfig
    const url = `${baseUrl}${id}/accounts?access_token=${longLiveAccessToken}`
    const response = await axios.get(url)
    const payload = {
      name: 'meta_page',
      org_id,
      social_metadata: response.data
    }
    
    await createSocialDetails(payload)
    return response.data
  } catch (error) {
    
  }
}