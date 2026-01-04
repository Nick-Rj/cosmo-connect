import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import authRoutes from './routes/authRoutes.route.js';
import messageRoutes from './routes/messageRoutes.route.js';
import mongoConnect from './db/mongoDbConnect.js';

// Setting up the server
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Parsing JSON from requests
app.use(express.json());

// Deployment Config
const __dirname = path.resolve();

// All Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

// Mapping UI static files for deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    // Mapping index.html for accessing all the UI routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}


mongoConnect().then(() => {
    app.listen(PORT, () =>{
        console.log(`Server is up and running at ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

// app.listen(PORT, () =>{
//     console.log(`Server is up and running at ${PORT}`);
    // mongoConnect(); // Already connected above
    
// })