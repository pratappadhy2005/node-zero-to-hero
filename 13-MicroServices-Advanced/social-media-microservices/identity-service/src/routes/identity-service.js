const express = require('express');
const { registerUser, loginUser, refreshTokenUser } = require('../controllers/identity-controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshTokenUser);


module.exports = router;
