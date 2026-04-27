const logger = require('../utils/logger');
const Post = require('../models/Post');
const { validatePost } = require('../utils/validation');

async function invalidatePostCache(req, res) {
    const cacheKey = `posts:${req.query.page || 1}:${req.query.limit || 10}`;
    await req.redisClient.del(cacheKey);
    logger.info(`Post cache invalidated for page ${req.query.page || 1} and limit ${req.query.limit || 10}`);
}

const createPost = async (req, res) => {
    logger.info('createPost request received:', req.body);

    const { error } = validatePost(req.body);
    if (error) {
        logger.error('Invalid post data:', error.details[0].message);
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    try {
        const { title, content, mediaIds } = req.body;
        const post = await Post.create({
            user: req.user.userId,
            title,
            content,
            mediaIds: mediaIds || [],
        });
        logger.info('Post created successfully:', post);
        await invalidatePostCache(req, res);
        res.status(201).json(post);
    } catch (error) {
        logger.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllPosts = async (req, res) => {
    logger.info('getAllPosts request received:', req.query);
    try {

        const pageNumber = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
        const startIndex = (pageNumber - 1) * limit;

        const cacheKey = `posts:${pageNumber}:${limit}`;

        let cachedPosts = await req.redisClient.get(cacheKey);
        const totalPosts = await Post.countDocuments(req.query);

        if (cachedPosts) {
            logger.info('Posts retrieved from cache:', cachedPosts);
            res.status(200).json(JSON.parse(cachedPosts));
            return;
        }

        const posts = await Post.find(req.query).sort({ createdAt: -1 }).skip(startIndex).limit(limit);
        await req.redisClient.set(cacheKey, JSON.stringify(posts), 'EX', 60 * 5);
        logger.info('Posts retrieved successfully:', posts);

        result = {
            posts,
            totalPosts,
            currentPage: pageNumber,
            limit,
            totalPages: Math.ceil(totalPosts / limit),
        };

        res.status(200).json(result);
    } catch (error) {
        logger.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostById = async (req, res) => {
    //get id from path params
    logger.info('getPostById request received:', req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            logger.error('Post not found:', req.params.id);
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        logger.info('Post retrieved successfully:', post);
        await invalidatePostCache(req, res);
        res.status(200).json(post);
    } catch (error) {
        logger.error('Error retrieving post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePostById = async (req, res) => {
    logger.info('deletePostById request received:', req.params.id);
    try {
        await Post.findByIdAndDelete(req.params.id);
        logger.info('Post deleted successfully:', req.params.id);
        await invalidatePostCache(req, res);
        res.status(204).json({ message: 'Post deleted successfully' });
    } catch (error) {
        logger.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
};
