const { findUserByEmail, validatePassword } = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Login controller
function login(req, res) {
  const { email, password } = req.body;

  // Check if the user exists
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // Validate the plain text password
  if (!validatePassword(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({
    success: true,
    message: 'Login successful',
    token,
  });
}

module.exports = { login };
