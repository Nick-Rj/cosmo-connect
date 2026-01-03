import jwt from "jsonwebtoken";

export const emailValidator = (email) => {
   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
   return emailRegex.test(email);
}

export const usernameGenerator = (email) => {
    const alphanumericString = email
        .toLowerCase()  // Convert to lowercase
        .replace(/[^a-z0-9]/g, '')  // Remove all non-alphanumeric characters
        .substring(0, 7);  // Take first 7 characters
    
    // Generate a random 6-digit number (100000-999999)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);

    return `${alphanumericString}${randomSuffix}`;
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.AUTH_JWT_SECRET, {expiresIn: "7d"});

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // prevents XSS attacks : cross-site scripting
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: "strict", // CSRF protection
        path: "/" // cookie is available for the entire domain
    })
}