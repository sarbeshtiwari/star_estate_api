const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    data: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: true }
});

const UserModel = mongoose.model("projects_quickdetails", UserSchema);

module.exports = UserModel;
