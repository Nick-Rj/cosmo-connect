import dotenv from "dotenv";

dotenv.config();

export const getEnv = (key) => {
    return process.env[key];
};
