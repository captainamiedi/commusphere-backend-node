import axios from "axios";

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

    //         "https://graph.facebook.com/{graph-api-version}/oauth/access_token?  
    // grant_type=fb_exchange_token&          
    // client_id={app-id}&
    // client_secret={app-secret}&
    // fb_exchange_token={your-access-token}" 
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
    }
}