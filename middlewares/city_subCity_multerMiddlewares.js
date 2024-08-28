// const multer = require('multer');
// const path = require('path');

// const storageCity = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/city'); // Folder to save uploaded images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//     }
// });

// const storageSubCity = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/subcity'); // Folder to save uploaded images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//     }
// });

// const uploadCity = multer({ storage: storageCity });
// const uploadSubCity = multer({ storage: storageSubCity });

// module.exports = { uploadCity, uploadSubCity };

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const mkdirp = require('mkdirp'); // For creating nested directories

// // Define the directories for storage
// const cityUploadDir = 'uploads/city';
// const subCityUploadDir = 'uploads/subcity';

// // Function to ensure directory exists
// const ensureDirectoryExists = (dir) => {
//     // Use mkdirp to create directories recursively
//     mkdirp.sync(dir);
// };

// // Ensure directories exist
// ensureDirectoryExists(cityUploadDir);
// ensureDirectoryExists(subCityUploadDir);

// const storageCity = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, cityUploadDir); // Folder to save uploaded images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//     }
// });

// const storageSubCity = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, subCityUploadDir); // Folder to save uploaded images
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//     }
// });

// const uploadCity = multer({ storage: storageCity });
// const uploadSubCity = multer({ storage: storageSubCity });

// module.exports = { uploadCity, uploadSubCity };

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/im'); // Import your Cloudinary config

const sanitizeFilename = (filename) => {
    // Replace spaces and special characters with underscores or another safe character
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Create Cloudinary storage for city images
const storageCity = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/city',
        allowed_formats: ['jpg', 'png', 'jpeg', '.webp'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

// Create Cloudinary storage for subcity images
const storageSubCity = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/subcity',
        allowed_formats: ['jpg', 'png', 'jpeg', '.webp'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

// Create multer upload instances for city and subcity
const uploadCity = multer({ storage: storageCity });
const uploadSubCity = multer({ storage: storageSubCity });

module.exports = { uploadCity, uploadSubCity };
