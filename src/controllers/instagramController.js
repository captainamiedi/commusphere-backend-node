import axios from "axios"

export default {
    enablePageSubscription: async (req, res) => {
        try {
            const {pageId} = req.body

            const response = await axios.post(`https://graph.facebook.com/v18.0/${pageId}/subscribed_apps?subscribed_fields=feed,mention,mentions,name,picture,category,description,conversations,feature_access_list,inbox_labels,standby,message_mention,messages,message_reactions,messaging_account_linking,messaging_checkout_updates,messaging_customer_information,message_echoes,message_deliveries,message_context,messaging_game_plays,messaging_optins,messaging_optouts,messaging_payments,messaging_postbacks,messaging_pre_checkouts,message_reads,messaging_referrals,messaging_handovers,messaging_policy_enforcement,messaging_appointments,messaging_direct_sends,messaging_fblogin_account_linking,user_action,messaging_feedback,send_cart,otp_verification,group_feed,messaging_in_thread_lead_form_submit,founded,company_overview,mission,products,general_info,leadgen,leadgen_fat,location,hours,parking,public_transit,page_about_story,mcom_invoice_change,invoice_access_invoice_change,invoice_access_invoice_draft_change,invoice_access_onboarding_status_active,invoice_access_bank_slip_events,local_delivery,phone,email,website,ratings,attire,payment_options,culinary_team,general_manager,price_range,awards,hometown,current_location,bio,affiliation,birthday,personal_info,personal_interests,members,checkins,page_upcoming_change,page_change_proposal,merchant_review,product_review,videos,live_videos,video_text_question_responses,registration,publisher_subscriptions,invalid_topic_placeholde&access_token=${accessToken}`)
        } catch (error) {
            
        }
    },
    getMentionComment: async (req, res) => {
        try {
            const {userId, commentId} = req.body
            const response = await axios.get(`https://graph.facebook.com/${userId}?fields=mentioned_comment.comment_id(${commentId})`)
        } catch (error) {
            
        }
    },
    replyMention: async (req, res) => {
        try {
            const {userId, comment_id, media_id, message} = req.body
            const payload = {
                comment_id,
                media_id,
                message,
                access_token: ''
            }
            const response = await axios.post(`https://graph.facebook.com/${userId}/mentions`, payload)
        } catch (error) {
            
        }
    },
    getCaptionContent: async (req, res) => {
        try {
            const {userId, media_id} = req.body
            const response = await axios.get(`https://graph.facebook.com/${userId}?fields=mentioned_media.media_id(${media_id}){caption,media_type}`)
            
        } catch (error) {
            
        }
    },
    replyCaptionContent: async (req, res) => {
        try {
            const {userId, media_id, message} = req.body
            const payload = {
                media_id,
                message,
                access_token: ''
            }
            const response = await axios.post(`https://graph.facebook.com/${userId}/mentions`, payload)
            
        } catch (error) {
            
        }
    },
    getInsightMetric: async (req, res) => {
        try {
            const response = await axios.get(`https://graph.facebook.com/${userId}/insights?metric=impressions,reach,profile_views`)
        } catch (error) {
            
        }
    }
}