import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.route.js';
import messageRoutes from './routes/messageRoutes.route.js';

// Setting up the server
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Test Route
// app.get("/" , (req, res) => {
//     res.send("Server Base Route Triggered!");
// })

// All Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);




app.listen(PORT, () =>{
    console.log(`Server is up and running at ${PORT}`);
    
})