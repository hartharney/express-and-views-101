import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;
// Middleware function to extract user ID from the token and add it to req.params
export function extractUserIdFromToken(req: Request | any, res: Response, next: NextFunction) {
    // Check if the token is present in the cookie
    if (req.cookies && req.cookies.token) {
      const token = req.cookies.token;
  
      // Verify and decode the token to get user information
      jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            // Handle token verification error, if any
            return next(err);
          }
    
          // Add the user's ID to req.params
          if (typeof decoded.id === 'string') {
            req.params.id = decoded.id;
          } else {
            // Handle invalid user ID in the token
            return res.status(401).json({
              message: 'Invalid user ID in the token',
            });
          }
    
          // Continue to the next middleware or route handler
          next();
        });
    } else {
      // Handle the case where the token is not present in the cookie
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  }

  export default extractUserIdFromToken
  