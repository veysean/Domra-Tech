import jwt from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    // Verify the token using your JWT secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;

    // Call next() to pass the request to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid. Authorization denied.' });
  }
};

// checks if the authenticated user is an admin
const checkAdminRole = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
  }
  next();
};

export { verifyAuth, checkAdminRole };
