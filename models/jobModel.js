const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    position: { type: String, required: true },
    nos: { type: String, required: true },
    location: { type: String, required: true },
    qualification: { type: String, required: true },
    min_exp: { type: String, required: true },
    description: { type: String, required: true },
    added_on: { type: Date, required: false, default: Date.now },
    status: { type: Boolean, required: false, default: false }
});

const JobModel = mongoose.model("carrer", JobSchema);

module.exports = JobModel;
