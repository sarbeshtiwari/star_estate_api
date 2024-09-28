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
        const dir = 'star_estate/project_rera'; // Change this to your desired path
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
//         folder: 'star_estate/project_rera',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  


// Set up storage for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'uploads/project_rera';
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

// const upload = multer({ 
//     storage: storage, 
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
//             return cb(null, true);
//         }
//         cb(new Error('Only image files are allowed.'));
//     }
// });

// module.exports = upload;
