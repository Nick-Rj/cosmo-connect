import express from 'express';
import {
  acknowledgeUser,
  loginController,
  logoutController,
  signupController,
  updateUserProfile,
} from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.put('/update-profile', authenticateUser, updateUserProfile);
authRouter.get('/check-user', authenticateUser, acknowledgeUser);
export default authRouter;
