// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/im');
// const multer = require('multer');

// const sanitizeFilename = (filename) => {
//     // Replace spaces and special characters with underscores or another safe character
//     return filename
//         .replace(/\s+/g, '_')  // Replace spaces with underscores
//         .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
// };

// // Create Cloudinary storage with custom `public_id` logic
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'star_estate/ProjectBannerImage',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage }); 


// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to get the current datetime string
const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').split('.')[0].replace('T', '_'); // Format: YYYY-MM-DD_HH-MM-SS
};

// Configure Multer to store files locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'star_estate/ProjectBannerImage';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir ); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        const currentDateTime = getCurrentDateTime();
        const sanitizedFilename = file.originalname.split('.')[0].replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''); // Sanitize filename
        const fileExtension = path.extname(file.originalname); // Get the extension
        // Create the final filename
        cb(null, `${currentDateTime}_${sanitizedFilename}${fileExtension}`);
    },
});

// Create upload middleware
const upload = multer({ storage: storage });

module.exports = upload;

