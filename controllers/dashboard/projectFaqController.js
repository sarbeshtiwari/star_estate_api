const UserModel = require('../../models/dashboard/projectFaqModel');

// Add FAQs
exports.addFaqByProject = async (req, res) => {
    const faqArray = req.body;

    if (!Array.isArray(faqArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of FAQs" });
    }

    try {
        const newReports = faqArray.map(faq => new UserModel(faq));
        console.log("New Data:", newReports);
        await UserModel.insertMany(newReports);
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch FAQs by project
exports.getFAQByProject = async (req, res) => {
    const { projectname } = req.params;

    try {
        const faqs = await UserModel.find({ projectname: projectname });
        res.json(faqs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch FAQ by ID
exports.fetchFAQById = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await UserModel.findById(id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json(faq);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update FAQ status
exports.updateFaqStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedFAQ = await UserModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedFAQ) {
            return res.status(404).json({ success: false, message: "FAQ not found" });
        }
        res.json({ success: true, message: "FAQ status updated successfully", updatedFAQ });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFAQ = await UserModel.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return res.status(404).json({ success: false, message: "FAQ not found" });
        }
        res.json({ success: true, message: "FAQ deleted successfully", deletedFAQ });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Update FAQ details
exports.updateFaq = async (req, res) => {
    const { id } = req.params;
    const faqArray = req.body; // Expect an array of FAQs

    if (!Array.isArray(faqArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of FAQs" });
    }

    try {
        const results = [];
        for (const faq of faqArray) {
            const updatedFAQ = await UserModel.findByIdAndUpdate(faq._id, faq, { new: true });
            if (updatedFAQ) {
                results.push(updatedFAQ);
            }
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "FAQs not found" });
        }

        res.json({ success: true, message: "FAQs updated successfully", updatedFAQs: results });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};
