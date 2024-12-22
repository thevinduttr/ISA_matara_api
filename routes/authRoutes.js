const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// POST /api/login - Login route
router.post('/login', login);

module.exports = router;
