import jwt from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  // The header usually looks like 'Bearer TOKEN', so we split it
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }

  try {
    // Verify the token using your JWT secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's information from the token to the request object
    // This allows you to access it in your controllers
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;

    // Call next() to pass the request to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid. Authorization denied.' });
  }
};

export default verifyAuth;