import express from 'express';
import {
  acknowledgeUser,
  loginController,
  logoutController,
  signupController,
  updateUserProfile,
} from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const authRouter = express.Router();

// Option 1: Passing arcjet middleware directly to the authRouter. First, this middleware will be executed.
authRouter.use(arcjetProtection);

// Test API for Arcjet: Test with Browser
authRouter.get('/test-aj', (_, res) => {
  res.status(200).json({ message: 'Arcjet Test', success: true });
});

// Option 2: Passing arcjet middleware to all the routes separately.
authRouter.post('/signup', arcjetProtection, signupController);
authRouter.post('/login', arcjetProtection, loginController);
authRouter.post('/logout', arcjetProtection, logoutController);
authRouter.put('/update-profile', arcjetProtection, authenticateUser, updateUserProfile);
authRouter.get('/check-user', arcjetProtection, authenticateUser, acknowledgeUser);
export default authRouter;
