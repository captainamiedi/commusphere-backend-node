import axios from "axios";
import { getAppAccessToken, getPageAccessToken } from "../Service/metaService.js";

export default {
    instagramConsumerWebhook: async (req, res) => {
        try {
            console.log(req.query['hub.mode'], 'mode');
            console.log(req.query['hub.verify_token'], 'verify token');
            const token = process.env.TOKEN || 'token';
            console.log(token, 'token');
            console.log(req.body, 'body of webhook');
            if (
                req.query['hub.mode'] == 'subscribe' &&
                req.query['hub.verify_token'] == token
              ) {
                res.send(req.query['hub.challenge']);
              } else {
                res.sendStatus(400);
              }
        } catch (error) {
            console.log(error);
        }
    },
    instagramBusinessWebhook: async (req, res) => {
        try {
            console.log(req.query['hub.mode'], 'mode');
            console.log(req.query['hub.verify_token'], 'verify token');
            const token = process.env.TOKEN || 'token';
            console.log(token, 'token');
            console.log(req.body, 'body of webhook');
            if (
                req.query['hub.mode'] == 'subscribe' &&
                req.query['hub.verify_token'] == token
              ) {
                res.send(req.query['hub.challenge']);
              } else {
                res.sendStatus(400);
              }
        } catch (error) {
            console.log(error);
        }
    },
    oauth2callback: async (req, res) => {
        try {
            const {access_token} = req.body
            const {META_CONSUMER_INSTAGRAM_APP_ID, META_CONSUMER_INSTAGRAM_APP_SECRET} = process.env
            const graphApiVersion = 'v18.0'; // Replace with your desired Graph API version
            const url = `https://graph.facebook.com/${graphApiVersion}/oauth/access_token`;

            const response = await axios.get(url, {
                params: {
                  grant_type: 'fb_exchange_token',
                  client_id: META_CONSUMER_INSTAGRAM_APP_ID,
                  client_secret: META_CONSUMER_INSTAGRAM_APP_SECRET,
                  fb_exchange_token: access_token,
                },
              });
            console.log(response.data, 'respinse')

            res.send(response.data)

            // "EAAFMZCWxqZBOIBOzyuvAC1LJP7YG8XM3tXjLm5iJOeol8A5thIzaC9WSOKWf7gkkK9gbnavLN2VLpJG92Tng3r86rZCtnDGBq68LkM3wQiZAKc161SIU4ujq6gFmX9lkaH9xhDdqeZBLQqQG7REiBQFukg8pOj9qrnrBg0Pd8NEN2zHXKzcaDcikvCNWjRTJhF786zPCzxz1XhiRi3aZBODPIcgyAGZAZCP4kwkZD"
        } catch (error) {
           console.log(error, 'handle error'); 
        }
    },
    oauth2BusinessCallback: async (req, res) => {
        try {
            const {access_token} = req.body
            const {META_BUSINESS_INSTAGRAM_APP_ID, META_BUSINESS_INSTAGRAM_APP_SECRET} = process.env
            const graphApiVersion = 'v18.0'; // Replace with your desired Graph API version
            const url = `https://graph.facebook.com/${graphApiVersion}/oauth/access_token`;

            const response = await axios.get(url, {
                params: {
                  grant_type: 'fb_exchange_token',
                  client_id: META_BUSINESS_INSTAGRAM_APP_ID,
                  client_secret: META_BUSINESS_INSTAGRAM_APP_SECRET,
                  fb_exchange_token: access_token,
                },
              });
            console.log(response.data, 'respinse')

            res.send(response.data)

            // "EAAFMZCWxqZBOIBOzyuvAC1LJP7YG8XM3tXjLm5iJOeol8A5thIzaC9WSOKWf7gkkK9gbnavLN2VLpJG92Tng3r86rZCtnDGBq68LkM3wQiZAKc161SIU4ujq6gFmX9lkaH9xhDdqeZBLQqQG7REiBQFukg8pOj9qrnrBg0Pd8NEN2zHXKzcaDcikvCNWjRTJhF786zPCzxz1XhiRi3aZBODPIcgyAGZAZCP4kwkZD"
        } catch (error) {
           console.log(error, 'handle error'); 
        }
    },
    facebookWebhook: async (req, res) => {
      try {
        console.log('Facebook request body:', req.body);
        var received_updates = [];
        if (!req.isXHubValid()) {
          console.log('Warning - request header X-Hub-Signature not present or invalid');
          res.sendStatus(401);
          return;
        }
      
        console.log('request header X-Hub-Signature validated');
        // Process the Facebook updates here
        received_updates.unshift(req.body);
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
      }
    },
    instagramWebhook: async (req, res) => {
      try {
        var received_updates = [];
        console.log('Instagram request body:');
        console.log(req.body);
        // Process the Instagram updates here
        received_updates.unshift(req.body);
        res.sendStatus(200);
      } catch (error) {
        
      }
    },
    instagramBusinessWebhookReceiver: async (req, res) => {
      try {
        var received_updates = [];
        console.log('Instagram request body:');
        console.log(req.body);
        // Process the Instagram updates here
        received_updates.unshift(req.body);
        res.sendStatus(200);
      } catch (error) {
        
      }
    },
    instagramBusinessRedirect: async (req, res) => {
      try {
        const {access_token, longLivedToken } = req.body // user token
        // get user page id, page access token and business account
        // "https://graph.facebook.com/v18.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=EAACw..."
        const response = await axios.get('https://graph.facebook.com/v18.0/me/accounts', {
          params: {
            fields: 'id,name,access_token,instagram_business_account',
            access_token,
          },
        })

        // {
        //   "data": [
        //     {
        //       "id": "134895793791914", page id
        //       "name": "Metricsaurus",
        //       "access_token": "EAACw...", page access token
        //       "instagram_business_account": {
        //         "id": "17841405309211844" Instagram Professional account ID
        //       }
        //     }
        //   ],
        //   "paging": {
        //     "cursors": {
        //       "before": "MTc1NTg0Nzc2ODAzNDQwMgZDZD",
        //       "after": "MTc1NTg0Nzc2ODAzNDQwMgZDZD"
        //     }
        //   }
        // }
      } catch (error) {
        
      }
    },
    getPageAccess: async (req, res) => {
      try {
        console.log('here');
        const access = await getAppAccessToken()
        console.log(access);
        return res.send(access)
      } catch (error) {
        console.log(error);
      }
    }
}