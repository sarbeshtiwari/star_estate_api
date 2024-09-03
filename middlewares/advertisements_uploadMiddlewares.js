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
        folder: 'star_estate/advertisements',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

  
const upload = multer({ storage: storage });  

module.exports = upload;