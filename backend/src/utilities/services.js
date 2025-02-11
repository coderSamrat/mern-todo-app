import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const authenticateToken = async (req, res, next) => {
      const token = req.header('Authorization')?.split(' ')[1]; 

      if (!token) {
            return res.status(401).json({ message: 'Access denied, token missing', error: true });
      }

      try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  
            const user = await User.findById(decoded.id);  

            if (!user) {
                  return res.status(401).json({ message: 'User not found', error: true });
            }

            req.user = user; 
            next();  
      } catch (error) {
            return res.status(403).json({ message: 'Invalid or expired token', error: true });
      }
};
