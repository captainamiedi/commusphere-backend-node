import { Router } from 'express'
import authController from '../controllers/authController.js'
import auth from '../Validator/auth.js'

const route = Router()

const {signup, login} = authController
const {signupValidation, signupValidationForm, loginValidationForm} = auth


route.post('/signup',signupValidationForm, signupValidation, signup)
route.post('/login', loginValidationForm, signupValidation, login)

export default route

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - phone_number
 *         - org_name
 *         - org_size
 *         - job_title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the organization
 *         first_name:
 *           type: string
 *           description: User first name
 *         last_name:
 *           type: string
 *           description: User last name
 *         password:
 *           type: string
 *           description: User Password
 *         phone_number:
 *           type: string
 *           description: User phone number
 *         org_name:
 *           type: string
 *           description: Organization name
 *         org_size:
 *           type: string
 *           description: Organization work force range
 *         job_title:
 *           type: string
 *           description: Job title
 *         email:
 *           type: string
 *           description: Work email
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         first_name: John
 *         last_name: Alexander
 *         email: test@example.com
 *         password: 12345678
 *         phone_number: +23454776456474
 *         org_name: Communsphere
 *         org_size: 1-10
 *         job_title: CTO
 *         createdAt: 2024-02-10T04:05:06.157Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization_Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Work Email
 *         password:
 *           type: string
 *           description: User Password
 *       example:
 *         email: test@example.com
 *         password: 12345678
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management API
 * /signup:
 *   post:
 *     summary: Create an Organization
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       500:
 *         description: Some server error
 * /login:
 *   post:
 *     summary: Login an Organization
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization_Login'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       500:
 *         description: Some server error
 */