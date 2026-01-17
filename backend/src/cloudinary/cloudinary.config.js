import { v2 as cloudinary } from 'cloudinary';
import { getEnv } from '../utils/env.js';

const cloudinaryConfigHandler = () => {
  if (
    !getEnv('CLOUDINARY_CLOUD_NAME') ||
    !getEnv('CLOUDINARY_API_KEY') ||
    !getEnv('CLOUDINARY_API_SECRET')
  ) {
    throw new Error('Invalid cloudinary configurations!');
  }

  return cloudinary.config({
    cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
    api_key: getEnv('CLOUDINARY_API_KEY'),
    api_secret: getEnv('CLOUDINARY_API_SECRET'),
  });
};

const config = cloudinaryConfigHandler();

export default config;
