import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";

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
    ],
    forgotPassword: (req, res, next) => {
        const {email} = req.body

        if (!email || !email.trim()) {
            return errorResponse(res, statusCode.badRequest, 'Email is required')
        }

        next()
    },
    resetPasswordValidation: (req, res, next) => {
        const {password} = req.body

        if (!password || !password.trim()) {
            return errorResponse(res, statusCode.badRequest, 'Password is required')
        }

        next()
    }
}