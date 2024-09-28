const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to sanitize filename
const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Set up local storage with custom filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the path where you want to save the images
        const dir = 'star_estate/project_gallery'; // Change this to your desired path
        fs.mkdirSync(dir, { recursive: true }); // Create the folder if it doesn't exist
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = new Date().toISOString().replace(/[:]/g, '-').split('.')[0]; // Format as YYYY-MM-DDTHH-MM-SS
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]);
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}_${sanitizedFilename}${extension}`); // Save as datetime+filename.extension
    }
});

// Create multer instance with the defined storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;










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
//         folder: 'star_estate/project_gallery',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             return sanitizeFilename(file.originalname.split('.')[0]) + '_' + uniqueSuffix; // Append unique suffix to filename
//         },
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

