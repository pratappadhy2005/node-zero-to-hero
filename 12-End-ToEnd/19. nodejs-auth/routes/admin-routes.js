const express = require('express');
const router = express.Router();

router.get('/welcome', (req, res) => {
    if (req.userInfo.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
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