const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to sanitize the filename
const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Function to get the current datetime string
const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').split('.')[0].replace('T', '_');
};

// Configure storage for news images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'star_estate/news'; // Define your upload directory
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Set the upload directory
    },
    filename: function (req, file, cb) {
        const currentDateTime = getCurrentDateTime(); // Get the current date and time
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]); // Sanitize filename
        const fileExtension = path.extname(file.originalname); // Get the extension with the dot
        // Create the final filename
        cb(null, `${currentDateTime}_${sanitizedFilename}${fileExtension}`);
    },
});

// Create multer upload instance
const upload = multer({ storage: storage });



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
//         folder: 'star_estate/news',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  

// Helper function to ensure upload directory exists
// const ensureUploadDir = (dir) => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// };

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'uploads/news';
//         ensureUploadDir(uploadDir);
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const filename = Date.now() + ext;
//         cb(null, filename);
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
//             return cb(null, true);
//         }
//         cb(new Error('Only image files are allowed.'));
//     }
// });

module.exports = upload;
