const mongoose = require('mongoose');

const BankListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    alt_tag: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const BanksList = mongoose.model('banks_list', BankListSchema);

module.exports = BanksList;
