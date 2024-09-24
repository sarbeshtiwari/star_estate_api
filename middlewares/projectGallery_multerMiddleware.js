const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/im');
const multer = require('multer');


const sanitizeFilename = (filename) => {
    // Replace spaces and special characters with underscores or another safe character
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Create Cloudinary storage with custom `public_id` logic
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/project_gallery',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        public_id: (req, file) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return sanitizeFilename(file.originalname.split('.')[0]) + '_' + uniqueSuffix; // Append unique suffix to filename
        },
    },
});

const upload = multer({ storage: storage });

module.exports = upload;

