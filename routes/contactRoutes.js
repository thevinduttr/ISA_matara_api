const express = require('express');
const { contactFormHandler } = require('../controllers/contactController');

const router = express.Router();

router.post('/send-email', contactFormHandler);

module.exports = router;
