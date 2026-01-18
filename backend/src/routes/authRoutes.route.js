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

// Passing arcjet middleware directly to the authRouter. First, this middleware will be executed.
authRouter.use(arcjetProtection);

// Test API for Arcjet: Test with Browser
authRouter.get('/test-aj', (_, res) => {
  res.status(200).json({ message: 'Arcjet Test', success: true });
});

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.put('/update-profile', authenticateUser, updateUserProfile);
authRouter.get('/check-user', authenticateUser, acknowledgeUser);
export default authRouter;
