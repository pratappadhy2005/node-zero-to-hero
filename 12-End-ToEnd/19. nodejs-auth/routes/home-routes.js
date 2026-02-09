const express = require('express');
const router = express.Router();

router.get('/welcome', (req, res) => {
    console.log(req.userInfo);
    res.status(200).json({
        message: "Welcome to the Home Page",
        user: {
            userId: req.userInfo.userId,
            username: req.userInfo.username,
            email: req.userInfo.email,
            role: req.userInfo.role,
        }
    });
});

module.exports = router;
