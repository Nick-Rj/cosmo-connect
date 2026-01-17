import express from 'express';
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.route.js';
import messageRoutes from './routes/messageRoutes.route.js';
import mongoConnect from './db/mongoDbConnect.js';
import { getEnv } from './utils/env.js';
import swaggerDocs from './swagger/swagger.config.js';

// Setting up the server
const app = express();
const PORT = getEnv("PORT") || 5000;

// Initialzying Swagger
swaggerDocs(app);

// Parsing JSON from requests
app.use(express.json());

// Parsing Cookies from response
app.use(cookieParser());

// Deployment Config
const __dirname = path.resolve();

// All Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

// Mapping UI static files for deployment
if(getEnv("NODE_ENV") === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    // Mapping index.html for accessing all the UI routes
    app.get("*", (_, res) => {
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