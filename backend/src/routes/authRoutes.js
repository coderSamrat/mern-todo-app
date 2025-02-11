import { Router } from 'express';
import { createAccount, getUser, login } from '../controllers/user.controller.js';
import { authenticateToken } from '../utilities/services.js';

const authRoutes = Router();

authRoutes.route('/create-account').post(createAccount);
authRoutes.route('/login').post(login);
authRoutes.route('/get-user').get(authenticateToken, getUser);


export { authRoutes };