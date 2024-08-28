
const cloudinary = require('../config/im');

const deleteFromCloudinary = async (publicId) => {
    try {
        console.log(publicId);
        // const pub = await extractPublicIdFromUrl(publicId);
        // console.log(pub);
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        throw error;
    }
};

// function extractPublicIdFromUrl(publicId) {
//     // Use a regular expression to extract the path after 'v[version]/'
//     const regex = /\/v\d+\/(.+?)\.[^\/]+$/;
//     const match = publicId.match(regex);
    
//     if (match && match[1]) {
//         return match[1]; // The public_id
//     } else {
//         return null; // Return null if no match is found
//     }
// }


module.exports = deleteFromCloudinary;