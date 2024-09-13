const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    LocationAdvantagesId: { type: String, required: true },
    title: { type: String, required: true },
    proximity: { type: String, required: false },
    unit: { type: String, required: false },
    status: { type: Boolean, required: true }
});

const contentSchema = new mongoose.Schema({
    locationContent: { type: String, default: '' },
});

const UserSchema = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [UserDataSchema],
    data1: [contentSchema]
});

const ProjectLocationModel = mongoose.model("projects_LocationAdvantages", UserSchema);

module.exports = ProjectLocationModel;
