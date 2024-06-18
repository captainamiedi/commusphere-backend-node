import { body, param, validationResult } from "express-validator"
export default {
    createLeadVal: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    validateLeadForm: [
        body('name').trim().notEmpty().withMessage('Lead Name is Required'),
        body('status').trim().notEmpty().withMessage('Status is required'),
        body('source').trim().notEmpty().withMessage('source is required')
    ],
    validateLeadParams: [
        param('id', 'Leads Id is required')
    ],
    validateLeadOpportunity: [
        body('product').trim().notEmpty().withMessage('Product is requires'),
        body('value').trim().notEmpty().withMessage('Value is requires'),
        body('probability').trim().notEmpty().withMessage('Probability is requires'),
    ],
    validateStatus: [
        body('name').trim().notEmpty().withMessage('Name of status is required')
    ],
    validateLeadActivity: [
        body('type').trim().notEmpty().withMessage('Type is requires'),
        body('note').trim().notEmpty().withMessage('Note is requires'),
        body('meeting_date').trim().notEmpty().withMessage('meeting date is requires'),
    ],
    validateLeadContact: [
        body('name').trim().notEmpty().withMessage('Type is requires'),
        body('position').trim().notEmpty().withMessage('Note is requires'),
        body('email').trim().notEmpty().withMessage('meeting date is requires'),
        body('phone_number').trim().notEmpty().withMessage('meeting date is requires'),
    ],
    validateEmailTemplate: [
        body('title').trim().notEmpty().withMessage('Title is requires'),
        body('message').trim().notEmpty().withMessage('message is requires'),
    ],
    validateMessagingTemplateSetting: [
        body('stage_probability').trim().notEmpty().withMessage('probability is requires'),
        body('stage_probability_template_id').trim().notEmpty().withMessage('template id is requires'),
        body('opportunity_id').trim().notEmpty().withMessage('opportunity id is requires'),
    ]
}