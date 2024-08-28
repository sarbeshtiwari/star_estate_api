const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    project_name: {type: String, required : true},
    user_query: { type: String, required: true },
    created_at: { type: Date, required: true },
    note: { type: String, required: false },
});

const LuxuryProjectsModel = mongoose.model("luxury_projects", QuerySchema);

module.exports = LuxuryProjectsModel;
