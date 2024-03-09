import axios from "axios"

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
//         https://graph.facebook.com/oauth/access_token
//   ?client_id={your-app-id}
//   &client_secret={your-app-secret}
//   &grant_type=client_credentials
        // https://graph.facebook.com/{your-user-id}/accounts?access_token={user-access-token}
        const response = await axios.get('https://graph.facebook.com/oauth/access_token?client_id=323926047109404&client_secret=0ee81c649ef73b43238b836bb2f80f56&grant_type=client_credentials')
        console.log(response.data, 'response data');
        console.log(response, 'response');
        return response.data
    } catch (error) {
        
    }
}

export const setPageSubscriptions = async () => {
    try {
        let url = new URL(`${config.apiUrl}/${config.pageId}/subscribed_apps`);
        url.search = new URLSearchParams({
          access_token: config.pageAccesToken,
          subscribed_fields: "feed"
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
        
    }
}

export const callSendApi =async (requestBody) => {
    let url = new URL(`${config.apiUrl}/me/messages`);
    url.search = new URLSearchParams({
      access_token: config.pageAccesToken
    });
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      console.warn(`Could not sent message.`, response.statusText);
    }
}