const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    amenityId: { type: String, required: true },
    status: { type: Boolean, required: true }
});

const UserSchema = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [UserDataSchema]
});

const UserModel = mongoose.model("projects_amenities", UserSchema);

module.exports = UserModel;
