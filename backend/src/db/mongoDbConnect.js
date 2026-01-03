import mongoose from "mongoose";

const mongoConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1); // 1 indicates failure, 0 indicates success
    }
}

export default mongoConnect;