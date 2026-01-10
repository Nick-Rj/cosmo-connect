import mongoose from "mongoose";
import { getEnv } from "../utils/env.js";

const mongoConnect = async () => {
    try {
        if(!getEnv("MONGO_DB_URI")) {
            throw new Error("MONGO_DB_URI is not defined in environment variables");
        }
        const connection = await mongoose.connect(getEnv("MONGO_DB_URI"));
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error", error);
        process.exit(1); // 1 indicates failure, 0 indicates success
    }
}

export default mongoConnect;