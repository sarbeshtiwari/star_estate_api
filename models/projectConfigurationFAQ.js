const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    faqType: { type: String, required: true },
    faqQuestion: { type: String, required: true },
    faqAnswer: { type: String, required: true },
    propertyType: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const FAQModel = mongoose.model("city_configuration_faq", FAQSchema);

module.exports = FAQModel;
