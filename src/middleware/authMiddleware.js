import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';
import statusCode from '../utils/statusCode.js';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// This function generates a token
export const generateToken = (id, email, first_name, org_id) => {
    const payload = {
      id,
      email,
      first_name,
      org_id
    };
    const option = { expiresIn: '1d' };
    // Adding the string bearer to jwt object and get token string
    return `Bearer ${jwt.sign(payload, jwtSecret, option)}`;
};

export const getToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  }
  return errorResponse(res, statusCode.unauthorized, 'Not authorized.');
};

export const verifyToken = (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, data) => {
    if (err) {
      return errorResponse(res, statusCode.unauthorized, 'Invalid Token, please login.');
    }
    req.userData = data;
    return next();
  });
};