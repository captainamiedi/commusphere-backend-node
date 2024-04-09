import { signupService } from "../Service/authService.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../middleware/authMiddleware.js";
import { errorResponse, successResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import { comparePassword, findUserByEmail, updatePassword, findUserById } from "../Service/user.js";
import { findOrgByEmail } from "../Service/organization.js";
import { getPasswordResetURL, resetPasswordTemplate, transporter, usePasswordHashToMakeToken, welcomeEmailTemplate } from "../utils/email.js";
import jwt from "jsonwebtoken"

export default {
    signup: async (req, res) => {
        try {
            const {
                org_name,
                org_email, 
                org_size, 
                org_phone_number, 
                org_address,
                first_name,
                last_name,
                email,
                phone_number,
                job_title,
                password
            } = req.body

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            const userObj = {
                first_name,
                last_name,
                email,
                phone_number,
                password: hashed,
                job_title
            }

            const orgObj = {
                org_name,
                org_address,
                org_email,
                org_phone_number,
                org_size,

            }
            const user = await signupService(userObj, orgObj)
            const token = generateToken(user.userRes.id, user.userRes.email, user.orgRes.org_name, user.orgRes.id)
            // Welcome email and account verification Email
            const emailTemplate = welcomeEmailTemplate(user.userRes)
            transporter(emailTemplate, res)
            return successResponseWithData(res, statusCode.created, 'Signup successful', user)
        } catch (error) {
            console.log(error);
          return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const validUser = await findUserByEmail(email)
            if (validUser === null || validUser === undefined) {
                return errorResponse(res, statusCode.notFound, 'email or password is invalid')
            }
            const { password: hashedPassword, ...data } = validUser.dataValues;
            const validPassword = await comparePassword(password, hashedPassword);
            if (!validPassword) {
                return errorResponse(res, statusCode.badRequest, 'email or password is invalid')
            } else {
              const token = generateToken(data.id, email, data.Organization.dataValues.org_name, data.Organization.dataValues.id);
              return successResponseWithData(
                res,
                statusCode.success,
                'login successful',
                { ...data, token }
              );
            }
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error);    
        }
    },
    sendPasswordResetEmail: async (req, res) => {
        const {email} = req.body

        try {
            const user = await findUserByEmail(email)
            console.log(user);
            if(user === null || user === undefined) {
                errorResponse(res, statusCode.notFound, 'Email not found')
            }
            const token = usePasswordHashToMakeToken(user.dataValues)
            console.log(token, 'token');
            const url = getPasswordResetURL(user.dataValues, token)
            const emailTemplate = resetPasswordTemplate(user.dataValues, url)
            await transporter(emailTemplate, res)
            return successResponse(res, statusCode.success, 'Password Reset Email Sent')
        } catch (error) {
            console.log(error, 'error');
            return errorResponse(res, error.statusCode || statusCode.serverError, error)
        }
    },
    receiveNewPassword: async (req, res) => {
        try {
            const { userId, token } = req.params;
            const { password } = req.body;
            const user = await findUserById(userId)
            console.log(user, 'user');
            if(user === null || user === undefined) {
                errorResponse(res, statusCode.notFound, 'User not found')
            }
            const secret = `${user.dataValues.password}-${user.dataValues.createdAt}`;
            const payload = jwt.decode(token, secret);
            if (payload.userId === user.id) {
                const salt = await bcrypt.genSalt(6);
                const hashed = await bcrypt.hash(password, salt);
                await updatePassword(hashed, user.id)
                return successResponse(res, statusCode.success, 'Password Reset Successful')
            }
            return errorResponse(res, statusCode.badRequest, 'Something went wrong')
        } catch (error) {
            console.log(error);
            return errorResponse(res, error.statusCode || statusCode.serverError, error) 
        }
    }
}