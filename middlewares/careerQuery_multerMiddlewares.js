const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to sanitize the filename
const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Configure storage for multer to save files locally
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'star_estate/career_query';
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Get current date and time formatted as YYYY-MM-DD_HH-MM-SS
        const currentDateTime = new Date().toISOString().replace(/:/g, '-').split('.')[0].replace('T', '_');
        
        // Sanitize the original file name
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]);
        const fileExtension = path.extname(file.originalname); // Get the extension with the dot
        
        // Create the final filename as datetime + sanitized name + extension
        cb(null, `${currentDateTime}_${sanitizedFilename}${fileExtension}`);
    },
});

// Initialize multer with the defined storage configuration
// const upload = multer({ storage: storage });

// module.exports = upload;








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
//         folder: 'star_estate/career_query',
//         allowed_formats: ['pdf'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'uploads/career_query';
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         const filename = Date.now() + ext;
//         cb(null, filename);
//     }
// });

// const fileFilter = function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     if (['.pdf'].includes(ext.toLowerCase())) {
//         return cb(null, true);
//     }
//     cb(new Error('Only PDF files are allowed.'));
// };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB in bytes
    }
});

module.exports = upload;
