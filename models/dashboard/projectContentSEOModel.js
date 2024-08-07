const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    description: { type: String, required: true },
    schema: { type: String, required: false },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const UserModel = mongoose.model("projects_ContentSEO", UserSchema);

module.exports = UserModel;
