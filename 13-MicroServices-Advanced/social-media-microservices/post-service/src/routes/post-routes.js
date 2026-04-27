const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/post-controller');
const authenticateRequest = require('../middleware/auth-middleware');

router.use(authenticateRequest);

router.post('/create', createPost);

router.get('/all', getAllPosts);


module.exports = router;
