require('dotenv').config();
const jwt = require("jsonwebtoken");
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}//DEBIG PURPOSES
// Middleware for handling admin authentication
function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const Bearertoken = req.headers.authorization;

    // Check if both username and token are provided
    if (!username || !Bearertoken) {
        return res.status(400).json({
            success: false,
            message: "Please provide both username and token"
        });
    }

    // Extract the token from the Bearer header
    const splitToken = Bearertoken.split(" ");
    const token = splitToken[1];

    // Ensure the token is present
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token not provided in the authorization header"
        });
    }

    // Attempt to decode and verify the token
    let decoded;
    try {
        // Verify the token using the 1234
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded); //debug purposes
        // Check if the decoded username matches the provided username
        if (decoded.username !== username) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        // Continue to the next middleware
        next();
    } catch (error) {
        // Handle token verification error
        console.error("Token verification error:", error); // Log the error for debugging
        return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = adminMiddleware;
