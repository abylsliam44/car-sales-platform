const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect, roleCheck } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', protect, roleCheck(['admin']), register);

router.post('/login', login);

module.exports = router;
