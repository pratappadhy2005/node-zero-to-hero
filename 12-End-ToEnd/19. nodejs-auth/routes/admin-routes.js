const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/admin-middleware');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/welcome', authMiddleware, isAdmin, (req, res) => {
    res.status(200).json({
        message: "Admin Page",
        user: {
            userId: req.userInfo.userId,
            username: req.userInfo.username,
            email: req.userInfo.email,
            role: req.userInfo.role,
        }
    });
});

module.exports = router;