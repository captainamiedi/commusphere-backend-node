import axios from "axios"

export const getPageAccessToken =async () => {
    try {
        // https://graph.facebook.com/{your-user-id}/accounts?access_token={user-access-token}
        const response = await axios.get('https://graph.facebook.com/323926047109404/accounts?access_token=EAAEmmZBj4sRwBO5sw9ZAgmhcBnlj5ApkZBjTBWm8F9Rhk8MaZCFqnnnsxxiVGZAeZB4XZCI3LNZB3klim7GikN2h0HZCsFZCXVZBhFJmkSu3rlGKrIk2yYNHEKoVI3rrjPBZCmOCJFgAsIzucEHGNZCzQZAwwzYNJ31QwFmjtPmFYtD7rAVNQqDf4GMSWTZCPalGJ0xoeHFQcmeK6HWwrgxnfFgfVuuc19hvzBojhhjc9YZD')
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