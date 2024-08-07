const multer = require('multer');
const path = require('path');

const storageCity = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/city'); // Folder to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const storageSubCity = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/subcity'); // Folder to save uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const uploadCity = multer({ storage: storageCity });
const uploadSubCity = multer({ storage: storageSubCity });

module.exports = { uploadCity, uploadSubCity };
