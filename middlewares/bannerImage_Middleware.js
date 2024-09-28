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
//         folder: 'star_estate/BannerImage',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage }); 


// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to sanitize the filename
const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Set the storage engine for multer (to store files locally)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the folder where files should be stored
        const uploadPath = path.join(__dirname, '../star_estate/BannerImage'); // Adjust the path as needed
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
        }
        cb(null, uploadPath); // Store files in this folder
    },
    filename: (req, file, cb) => {
        // Get current date and time formatted as YYYY-MM-DD_HH-MM-SS
        const currentDateTime = new Date().toISOString().replace(/:/g, '-').split('.')[0].replace('T', '_');
        
        // Sanitize the original file name and preserve its extension
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]);
        const fileExtension = path.extname(file.originalname);
        
        // Create final filename as datetime + sanitized name + extension
        const finalFilename = `${currentDateTime}_${sanitizedFilename}${fileExtension}`;
        
        cb(null, finalFilename);
    }
});

// Initialize multer with the defined storage configuration
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Define allowed file types (e.g., jpg, png, etc.)
        const allowedTypes = /jpg|jpeg|png|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpg, jpeg, png, webp, svg)'));
        }
    }
});  

module.exports = upload;
