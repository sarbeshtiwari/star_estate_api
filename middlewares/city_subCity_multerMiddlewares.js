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

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp'); // For creating nested directories

// Define the directories for storage
const cityUploadDir = 'uploads/city';
const subCityUploadDir = 'uploads/subcity';

// Function to ensure directory exists
const ensureDirectoryExists = (dir) => {
    // Use mkdirp to create directories recursively
    mkdirp.sync(dir);
};

// Ensure directories exist
ensureDirectoryExists(cityUploadDir);
ensureDirectoryExists(subCityUploadDir);

const storageCity = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, cityUploadDir); // Folder to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const storageSubCity = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, subCityUploadDir); // Folder to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const uploadCity = multer({ storage: storageCity });
const uploadSubCity = multer({ storage: storageSubCity });

module.exports = { uploadCity, uploadSubCity };
