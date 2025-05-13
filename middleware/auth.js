const jwt = require('jsonwebtoken');

// this is Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Example: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]; // Get token only

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;
