import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { getEnv } from '../utils/env.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token found!' });
    }

    const decodedToken = { parsedToken: '' };
    try {
      decodedToken.parsedToken = jwt.verify(token, getEnv('AUTH_JWT_SECRET'));
    } catch (jwtError) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token!' });
    }

    const fetchedUser = await User.findById(decodedToken?.parsedToken.userId).select('-password');

    if (!fetchedUser) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found!' });
    }

    req.user = fetchedUser;
    next();
  } catch (error) {
    console.log('Error while authenticating user!', error);
    return res.status(500).json({ success: false, message: 'Internal ServerError!' });
  }
};
