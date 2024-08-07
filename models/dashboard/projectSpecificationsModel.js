const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    title: { type: String, required: true },
    value: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const UserModel = mongoose.model("projects_projectSpecification", UserSchema);

module.exports = UserModel;
