const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/im');
const multer = require('multer');


const sanitizeFilename = (filename) => {
    return filename
        .replace(/\s+/g, '_')  
        .replace(/[^a-zA-Z0-9_]/g, ''); 
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'star_estate/star_rera',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
        public_id: (req, file) => sanitizeFilename(file.originalname.split('.')[0]), // Sanitize filename without extension
    },
});

  
const upload = multer({ storage: storage });  


module.exports = upload;
