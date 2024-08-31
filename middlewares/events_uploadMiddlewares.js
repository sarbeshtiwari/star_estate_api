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
        folder: 'star_estate/events',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

  
const upload = multer({ storage: storage });  


// Setup storage for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'uploads/events';
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
//     fileFilter: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext.toLowerCase())) {
//             return cb(null, true);
//         }
//         cb(new Error('Only image files are allowed.'));
//     }
// });


// Create Cloudinary storage with custom `public_id` logic
const imageGalleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/events/gallery',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});
 

// const imageGalleryStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, '..', 'uploads', 'events', 'gallery');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

const imageUpload = multer({ storage: imageGalleryStorage });

module.exports = { upload, imageUpload };
