require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware for handling user authentication
async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const BearerToken = req.headers.authorization;

    // Check if the authorization header and username are provided
    if (!username || !BearerToken) {
        return res.status(400).json({
            success: false,
            message: "Please provide both username and token"
        });
    }

    // Extract the token from the authorization header
    const splitToken = BearerToken.split(" ");
    const token = splitToken[1];

    // Ensure the token is present
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token not provided in the authorization header"
        });
    }

    // Verify and decode the token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded username matches the provided username
        if (decoded.username !== username) {
            return res.status(403).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Uncomment to check if the user exists in the database
        // const user = await User.findOne({ username });
        // if (!user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User not found"
        //     });
        // }

        // Proceed to the next middleware if all checks pass
        next();

    } catch (error) {
        // Log the error for debugging
        console.error("Token verification error:", error); // Log the error

        // Handle token verification error
        return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        });
    }
}

module.exports = userMiddleware;
