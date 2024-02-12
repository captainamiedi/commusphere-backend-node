import { body, validationResult } from "express-validator";

export default {
    signupValidation: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    signupValidationForm: [
        body('first_name').trim().notEmpty().withMessage('First name is required'),
        body('last_name').trim().notEmpty().withMessage('Last name is required'),
        body('email').trim().notEmpty().isEmail().withMessage('Email is required'),
        body('password').trim().notEmpty().withMessage('Password is required'),
        body('phone_number').trim().notEmpty().withMessage('Phone Number is required'),
        body('org_name').trim().notEmpty().withMessage('Organization name is required'),
        body('org_size').trim().notEmpty().withMessage('Organization size is required'),
        body('job_title').trim().notEmpty().withMessage('Job title is required'),
    ],
    loginValidationForm: [
        body('email').trim().notEmpty().isEmail().withMessage('Email is required'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ]
}