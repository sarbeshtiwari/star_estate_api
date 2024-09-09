const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    walkthrough: { type: String, required: true },
    // brochure: { type: String, required: false },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const WalkthroughModel = mongoose.model("projects_Brochure_Walkthrough", UserSchema);

module.exports = WalkthroughModel;
