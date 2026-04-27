const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, deletePostById } = require('../controllers/post-controller');
const authenticateRequest = require('../middleware/auth-middleware');

router.use(authenticateRequest);

router.post('/create', createPost);

router.get('/all', getAllPosts);

router.delete('/:id', deletePostById);

router.get('/:id', getPostById);

module.exports = router;
