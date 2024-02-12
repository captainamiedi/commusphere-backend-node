import { signupService } from "../Service/authService.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../middleware/authMiddleware.js";
import { errorResponse, successResponseWithData } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import { comparePassword, findUserByEmail } from "../Service/user.js";
import { findOrgByEmail } from "../Service/organization.js";

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
    }
}