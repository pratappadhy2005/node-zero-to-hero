const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/post-controller');
const authenticateRequest = require('../middleware/auth-middleware');

router.use(authenticateRequest);

router.post('/create', createPost);

module.exports = router;
