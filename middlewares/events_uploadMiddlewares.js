const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/events';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed.'));
    }
});

const imageGalleryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'events', 'gallery');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({ storage: imageGalleryStorage });

module.exports = { upload, imageUpload };
