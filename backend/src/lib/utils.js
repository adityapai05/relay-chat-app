import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    // Generate a JWT token with the user's ID in the payload.
    // The token is signed using the secret key from the environment variables.
    // It expires in 7 days.
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //Converting maxAge to milliseconds   (7 days) 
        httpOnly: true, // Ensures the cookie is accessible only via HTTP requests, prevents XSS attacks (cross-site scripting attacks)
        sameSite: "strict", // Prevents CSRF attacks (cross-site request forgery attacks)   
        secure:process.env.NODE_ENV !=="development" // Ensures the cookie is sent over HTTPS only, except in development mode
    })
    
    return token;
}