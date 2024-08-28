const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/im');
const multer = require('multer');



const sanitizeFilename = (filename) => {
    // Replace spaces and special characters with underscores or another safe character
    return filename
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-zA-Z0-9_]/g, ''); // Remove any non-alphanumeric characters except underscores
};

// Create Cloudinary storage with custom `public_id` logic
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/blogs',
        allowed_formats: ['jpg', 'png', 'jpeg', '.webp'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

  
const upload = multer({ storage: storage });  



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'uploads/blogs';
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
//     if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
//         return cb(null, true);
//     }
//     cb(new Error('Only image files are allowed.'));
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// });

module.exports = upload;
