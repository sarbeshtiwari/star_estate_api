// const mongoose = require('mongoose');

// const connect = () => {
//     mongoose.connect('mongodb://127.0.0.1:27017/star_estate')
//         .then(() => {
//             console.log("Connected to MongoDB");
//         })
//         .catch((err) => {
//             console.error("Error connecting to MongoDB:", err.message);
//         });
// };

// module.exports = { connect };


require('dotenv').config(); // Make sure this is at the top of your file

const mongoose = require('mongoose');

const connect = () => {
    const atlasUri = process.env.MONGODB_URI;

    mongoose.connect(atlasUri, {})
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err.message);
    });
};

module.exports = { connect };

