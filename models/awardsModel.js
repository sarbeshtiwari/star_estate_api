const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    awardName: { type: String, required: true },
    awardDate: { type: Date, required: true },
    awardImage: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const AwardModel = mongoose.model('awards', AwardSchema);

module.exports = AwardModel;
