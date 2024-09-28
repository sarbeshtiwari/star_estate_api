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
        const dir = 'star_estate/star_rera'; // Change this to your desired path
        fs.mkdirSync(dir, { recursive: true }); // Create the folder if it doesn't exist
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Format datetime as YYYY-MM-DD_HH-MM-SS
        const uniqueSuffix = new Date().toISOString().replace(/[:]/g, '-').split('.')[0]; 
        const sanitizedFilename = sanitizeFilename(file.originalname.split('.')[0]);
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}_${sanitizedFilename}${extension}`); // Save as datetime+filename.extension
    }
});

// Create multer instance with the defined storage
const upload = multer({ storage: storage });

module.exports = upload;









// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/im');
// const multer = require('multer');


// const sanitizeFilename = (filename) => {
//     return filename
//         .replace(/\s+/g, '_')  
//         .replace(/[^a-zA-Z0-9_]/g, ''); 
// };

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'star_estate/star_rera',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  


// module.exports = upload;
