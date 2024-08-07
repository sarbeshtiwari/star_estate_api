const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    faqType: { type: String, required: true },
    faqQuestion: { type: String, required: true },
    faqAnswer: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const UserModel = mongoose.model("project_faq", UserSchema);

module.exports = UserModel;
