const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    category: { type: String, required: true },
    briefContent: {type: String, required: true},
    content: { type: String, required: false },
    slugURL: {type: String, required: true},
    status: { type: Boolean, required: false, default: false }
});

const UserModel = mongoose.model("category", UserSchema);

module.exports = UserModel;
