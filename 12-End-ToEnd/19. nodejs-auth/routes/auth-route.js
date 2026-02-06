const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth-controller');

//all routes related to auth
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;