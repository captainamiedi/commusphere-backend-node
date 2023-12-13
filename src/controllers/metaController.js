export default {
    instagramConsumerWebhook: async (req, res) => {
        try {
            console.log(req.body, 'request instagram webhook body');
            console.log(req, 'request instagram webhook');
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
            console.log(req, 'callback request');
        } catch (error) {
           console.log(error, 'handle error'); 
        }
    }
}