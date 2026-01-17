import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { getEnv } from '../utils/env.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({ success: false, message: 'Unauthorized: No token found!' });
    }

    const decodedToken = jwt.verify(token, getEnv('AUTH_JWT_SECRET'));
    if (!decodedToken) {
      return res
        .status(400)
        .json({ success: false, message: 'Unauthorized: No valid token found!' });
    }

    const fetchedUser = await User.findById(decodedToken?.userId).select('-password');

    if (!fetchedUser) {
      return res.status(404).json({ success: false, message: 'Unauthorized: Not Validated!' });
    }

    req.user = fetchedUser;
    next();
  } catch (error) {
    console.log('Error while authenticating user!', error);
    return res.status(500).json({ success: false, message: 'Internal ServerError!' });
  }
};
