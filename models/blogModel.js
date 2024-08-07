const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    blogsName: { type: String, required: true },
    blogsBy: { type: String, required: true },
    blogsDate: { type: Date, required: false },
    blogsCategory: { type: String, required: true },
    blogsLink: { type: String, required: false },
    blogsImage: { type: String, required: true },
    imageTitle: { type: String, required: false },
    content: { type: String, required: false },
    status: { type: Boolean, required: false, default: false }
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;
