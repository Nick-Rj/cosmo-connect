import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { emailValidator, generateToken, usernameGenerator } from "../utils/syncHandlers.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { getEnv } from "../utils/env.js";

export const signupController = async (req, res) => {
    const {fullName, email, password, username} = req.body;

    try {
    
    if(!fullName || !email || !password) {
        return res.status(400).json({
            message: "All fields are required!",
            success: false
        })
    }

    if(password?.length < 6) {
        return res.status(400).json({
            message: "Password must be at least of 6 characters long!",
            success: false
        });
    }

    if(!emailValidator(email)){
        return res.status(400).json({
            message: "Please enter a valid email!",
            success: false
        });
    }

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return res.status(400).json({
            message: "User already exists!",
            success: false
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usernameValue = username || usernameGenerator(email);

    const newUser = new User({fullName, email, password: hashedPassword, username: usernameValue});
    // const newUser = await User.create({fullName, email, password: hashedPassword, username: usernameValue});

    if(newUser) {
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);
        res.status(201).json({
            message: "User signup successful!",
            success: true,
            user: {
                ...savedUser.toObject(),
                password: undefined
            }
        })

        // Send welcome email using email service [Mailtrap]
        try {
            await sendWelcomeEmail(savedUser.fullName, savedUser.email, getEnv("CLIENT_URL"));
        } catch (error) {
            console.error("Error sending welcome email:", error);
        }
        
    } else {
        res.status(400).json({
            message: "User signup failed. Invalid data found!",
            success: false
        })
    }

    } catch (error) {
        console.log("Error in signupController: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const loginController = (req, res) => {
    res.send("Login Successful!");
}

export const logoutController = (req, res) => {
    res.send("Logout Successful!");
}