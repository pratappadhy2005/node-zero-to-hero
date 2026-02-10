const multer = require("multer");
const path = require("path");

//set multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image file. Please upload an image file."), false);
    }
};

//set multer upload
const uploadMiddleware = multer({ storage: storage, fileFilter: checkFileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

module.exports = uploadMiddleware;