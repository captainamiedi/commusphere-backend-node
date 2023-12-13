export default {
    instagramConsumerWebhook: async (req, res) => {
        try {
            console.log(req.body, 'request instagram webhook body');
            console.log(req, 'request instagram webhook');
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