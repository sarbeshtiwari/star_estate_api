const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/projects/brochure';
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
        if (['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.docx', '.doc'].includes(ext.toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Only image, pdf and word files are allowed.'));
    }
});

module.exports = upload;
