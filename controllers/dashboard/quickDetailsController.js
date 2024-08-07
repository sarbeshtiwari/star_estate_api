const UserModel = require('../../models/dashboard/quickDetailsModel');

// Add Quick Details
exports.addQuickDetailsByProjectName = async (req, res) => {
    const DetailArray = req.body;

    if (!Array.isArray(DetailArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of Details" });
    }

    try {
        const newReports = DetailArray.map(detail => new UserModel(detail));
        await UserModel.insertMany(newReports);
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all details by projectName
exports.getQuickDetailsByProjectName = async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).send("Invalid projectName");
    }

    try {
        const details = await UserModel.find({ projectname: id });
        if (details.length === 0) {
            return res.status(404).send("No details found for the given projectName");
        }
        res.json(details);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch detail by ID
exports.fetchDetailById = async (req, res) => {
    const { id } = req.params;

    try {
        const detail = await UserModel.findById(id);
        if (!detail) {
            return res.status(404).json({ error: 'Detail not found' });
        }
        res.json(detail);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update status of a detail
exports.updateDetailStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedDetail = await UserModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedDetail) {
            return res.status(404).json({ success: false, message: "Detail not found" });
        }
        res.json({ success: true, message: "Detail status updated successfully", updatedDetail });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a detail
exports.deleteDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDetail = await UserModel.findByIdAndDelete(id);
        if (!deletedDetail) {
            return res.status(404).json({ success: false, message: "Detail not found" });
        }
        res.json({ success: true, message: "Detail deleted successfully", deletedDetail });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update detail details
exports.updateDetail = async (req, res) => {
    const { id } = req.params;
    const { DetailArray } = req.body;

    if (!Array.isArray(DetailArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array of Details" });
    }

    try {
        const results = [];
        for (const detail of DetailArray) {
            const updatedDetail = await UserModel.findByIdAndUpdate(detail._id, detail, { new: true });
            if (updatedDetail) {
                results.push(updatedDetail);
            }
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Details not found" });
        }
        res.json({ success: true, message: "Details updated successfully", updatedDetails: results });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
