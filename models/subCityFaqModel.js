const mongoose = require('mongoose');

const SubCityFAQSchema = new mongoose.Schema({
    faqType: { type: String, required: true },
    faqQuestion: { type: String, required: true },
    faqAnswer: { type: String, required: true },
    sub_city: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const SubCityFAQModel = mongoose.model("sub_city_faq", SubCityFAQSchema);

module.exports = SubCityFAQModel;
