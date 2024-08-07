const FAQModel = require('../models/faqModel');

exports.addFaqByCity = async (req, res) => {
    const faqArray = req.body;

    if (!Array.isArray(faqArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of FAQs" });
    }

    try {
        await FAQModel.insertMany(faqArray);
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getFAQByCityAndType = async (req, res) => {
    const { city, faqType } = req.params;

    try {
        const faqs = await FAQModel.find({ city, faqType });
        res.json(faqs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.fetchFAQById = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await FAQModel.findById(id);
        if (!faq) return res.status(404).json({ error: 'FAQ not found' });
        res.json(faq);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateFaqStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedFAQ = await FAQModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedFAQ) return res.status(404).json({ success: false, message: "FAQ not found" });
        res.json({ success: true, message: "FAQ status updated successfully", updatedFAQ });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteFAQ = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFAQ = await FAQModel.findByIdAndDelete(id);
        if (!deletedFAQ) return res.status(404).json({ success: false, message: "FAQ not found" });
        res.json({ success: true, message: "FAQ deleted successfully", deletedFAQ });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateFaqDetails = async (req, res) => {
    const { id } = req.params;
    const { faqArray } = req.body;

    if (!Array.isArray(faqArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of FAQs" });
    }

    try {
        const results = [];
        for (const faq of faqArray) {
            const updatedFAQ = await FAQModel.findByIdAndUpdate(faq._id, faq, { new: true });
            if (updatedFAQ) results.push(updatedFAQ);
        }
        if (results.length === 0) return res.status(404).json({ success: false, message: "FAQs not found" });
        res.json({ success: true, message: "FAQs updated successfully", updatedFAQs: results });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
