"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
// Middleware function to extract user ID from the token and add it to req.params
function extractUserIdFromToken(req, res, next) {
    // Check if the token is present in the cookie
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;
        // Verify and decode the token to get user information
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                // Handle token verification error, if any
                return next(err);
            }
            // Add the user's ID to req.params
            if (typeof decoded.id === 'string') {
                req.params.id = decoded.id;
            }
            else {
                // Handle invalid user ID in the token
                return res.status(401).json({
                    message: 'Invalid user ID in the token',
                });
            }
            // Continue to the next middleware or route handler
            next();
        });
    }
    else {
        // Handle the case where the token is not present in the cookie
        return res.status(401).json({
            message: "Authentication failed",
        });
    }
}
exports.extractUserIdFromToken = extractUserIdFromToken;
exports.default = extractUserIdFromToken;
