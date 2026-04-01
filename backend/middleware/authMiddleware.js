import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token', data: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found', data: null });
    }

    // Attach user payload as per assumption
    req.user = {
      userId: user._id,
      role: user.role,
      ...user._doc
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed', data: error.message });
  }
};
