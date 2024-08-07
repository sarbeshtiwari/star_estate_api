const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDesc: { type: String, required: false },
    heading: { type: String, required: true },
    paperName: { type: String, required: true },
    newsDate: { type: Date, required: false },
    newsState: { type: String, required: true },
    imageTitle: { type: String, required: true },
    newsThumb: { type: String, required: true },
    newsImage: { type: String, required: true },
    status: { type: Boolean, required: false, default: false }
});

const NewsModel = mongoose.model('News', NewsSchema);

module.exports = NewsModel;
