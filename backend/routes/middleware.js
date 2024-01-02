// middleware.js
const jwt = require('jsonwebtoken');

// Middleware for token authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
