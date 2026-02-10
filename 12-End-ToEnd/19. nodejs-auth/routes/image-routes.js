const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImageController } = require("../controllers/image-controller");

const Image = require("../models/Image");

const router = express.Router();

router.post("/upload", authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImageController);

router.get("/", authMiddleware, adminMiddleware, (req, res) => {
    // get all images uploaded by the user
    Image.find({ uploadedBy: req.userInfo.userId })
        .then((images) => {
            res.status(200).json({
                message: "Images retrieved successfully",
                images,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Image retrieval failed", error: error.message });
        });
});

module.exports = router;