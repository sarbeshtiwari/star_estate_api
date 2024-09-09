const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    amenityId: { type: String, required: true },
    status: { type: Boolean, required: true }
});

const contentSchema = new mongoose.Schema({
    amenityContent: { type: String, default: '' },
});

const UserSchema = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [UserDataSchema],
    data1: [contentSchema]
});

const ProjectAmenitiesModel = mongoose.model("projects_amenities", UserSchema);

module.exports = ProjectAmenitiesModel;
