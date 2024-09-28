// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/im');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');




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
//         folder: 'star_estate/banks_list',
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
//         public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
//     },
// });

  
// const upload = multer({ storage: storage });  




const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'star_estate/banks_list';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get the original file extension
        const originalName = path.basename(file.originalname, ext); // Get the original file name without extension
        const filename = `${originalName}_${Date.now()}${ext}`; // Combine original name, timestamp, and extension
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage, 
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext.toLowerCase())) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed.'));
    }
});

module.exports = upload;

