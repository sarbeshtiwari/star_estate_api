const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Function to sanitize the filename (removing special characters)
const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Set the storage engine for multer (to store files locally)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the folder where files should be stored
        const uploadPath = path.join(__dirname, '../star_estate/projects');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
        }
        cb(null, uploadPath); // Store files in this folder
    },
    filename: (req, file, cb) => {
        // Get current date formatted as YYYY-MM-DD_HH-MM-SS
        const currentDate = new Date().toISOString().replace(/:/g, '-').split('.')[0].replace('T', '_');
        
        // Sanitize the original file name and preserve its extension
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]);
        const fileExtension = path.extname(file.originalname);
        
        // Create final filename as date + sanitized filename + extension
        const finalFilename = `${currentDate}_${sanitizedFilename}${fileExtension}`;
        
        // Attach the full path to the request object for later use
        if (!req.filePaths) {
            req.filePaths = [];
        }
        // Store the complete path including the directory and filename
        req.filePaths.push(`${finalFilename}`);
        
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

// Middleware to send the paths of all uploaded files back to the client
const returnFilePaths = (req, res) => {
    if (req.filePaths && req.filePaths.length > 0) {
        return res.status(200).json({
            success: true,
            filePaths: req.filePaths // Return all the file paths including the directory
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        });
    }
};

module.exports = {
    upload,
    returnFilePaths
};





// const path = require('path');
// const fs = require('fs');
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
//         folder: 'star_estate/projects',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  
  


// module.exports = upload;