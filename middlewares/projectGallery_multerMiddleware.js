const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/project_gallery';
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
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed.'));
    }
});

module.exports = upload;
