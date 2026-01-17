import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { emailValidator, generateToken, usernameGenerator } from '../utils/syncHandlers.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';
import { getEnv } from '../utils/env.js';
import cloudinary from '../cloudinary/cloudinary.config.js';

export const signupController = async (req, res) => {
  const { fullName, email, password, username } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required!',
        success: false,
      });
    }

    if (password?.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least of 6 characters long!',
        success: false,
      });
    }

    if (!emailValidator(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email!',
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists!',
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usernameValue = username || usernameGenerator(email);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      username: usernameValue,
    });
    // const newUser = await User.create({fullName, email, password: hashedPassword, username: usernameValue});

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      // Send welcome email using email service [Mailtrap]
      try {
        await sendWelcomeEmail(savedUser.fullName, savedUser.email, getEnv('CLIENT_URL'));
      } catch (error) {
        console.error('Error sending welcome email:', error);
      }

      return res.status(201).json({
        message: 'User signup successful!',
        success: true,
        user: {
          ...savedUser.toObject(),
          password: undefined,
        },
      });
    } else {
      return res.status(400).json({
        message: 'User signup failed. Invalid data found!',
        success: false,
      });
    }
  } catch (error) {
    console.log('Error in signupController: ', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const fetchedUser = await User.findOne({ email });
    if (!fetchedUser) {
      return res.status(400).json({ success: false, message: 'Please enter valid credentials!' });
    }

    const isPassVerified = await bcrypt.compare(password, fetchedUser.password);
    if (!isPassVerified) {
      return res.status(400).json({ success: false, message: 'Please enter valid credentials!' });
    }

    generateToken(fetchedUser?._id, res);
    return res.status(201).json({
      success: true,
      user: { ...fetchedUser.toObject(), password: undefined },
      message: 'Login Successful!',
    });
  } catch (error) {
    console.log('Error while logging in!', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error!' });
  }
};

export const logoutController = (_, res) => {
  console.log('User logged out sucessfully!');
  res.cookie('jwt', '', { maxAge: 0 });
  return res.status(200).json({ success: true, message: 'User logged out successfully!' });
};

export const updateUserProfile = async (req, res) => {
  try {
    const newData = { ...req.body };
    const existingData = { ...req.user._doc };

    if (!newData?.profilePicture && !existingData?.profilePicture) {
      return res.status(400).json({ success: false, message: 'Profile Picture Not Found!' });
    }

    const userId = existingData._id;

    if (!userId) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    if (newData?.profilePicture) {
      const profilePicUploadRes = await cloudinary.uploader.upload(newData?.profilePicture);

      if (!profilePicUploadRes) {
        return res.status(400).json({ success: false, message: 'Profile picture upload failed!' });
      }

      newData.profilePicture = profilePicUploadRes?.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { ...newData }, { new: true });

    if (!updatedUser) {
      return res.status(400).json({ success: false, message: 'Failed to fetch the updated user!' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'User profile updated successfully!', user: updatedUser });
  } catch (error) {
    console.log('Error updating user profile!', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error!' });
  }
};

export const acknowledgeUser = (req, res) => {
  return res.status(200).json(req.user);
};
