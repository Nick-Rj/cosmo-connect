import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import authRoutes from './routes/authRoutes.route.js';
import messageRoutes from './routes/messageRoutes.route.js';

// Setting up the server
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Deployment Config
const __dirname = path.resolve();

// Test Route
// app.get("/" , (req, res) => {
//     res.send("Server Base Route Triggered!");
// })

// All Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

// Mapping UI static files for deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")))

    // Mapping index.html for accessing all the UI routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
    })
}




app.listen(PORT, () =>{
    console.log(`Server is up and running at ${PORT}`);
    
})