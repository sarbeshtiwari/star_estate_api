const UserModel = require('../../models/dashboard/projectBrochureWalkthroughModel');
const path = require('path');
const fs = require('fs');

// Add Brochure and Walkthrough
exports.addBrochureWalkthrough = async (req, res) => {
    const { walkthrough, projectname, status } = req.body;
    const brochure = req.file ? req.file.filename : null;

    if (!walkthrough) {
        return res.status(400).json({ success: false, message: "Fill the required field" });
    }

    const newReport = new UserModel({ walkthrough, brochure, projectname, status });

    try {
        console.log("New Data:", newReport);
        await newReport.save();
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Brochure_Walkthrough by projectName
exports.getBrochureWalkthroughByProjectName = async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).send("Invalid projectName");
    }

    try {
        const brochureWalkthrough = await UserModel.find({ projectname: id });
        res.json(brochureWalkthrough);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch Brochure_Walkthrough by ID
exports.fetchBrochureWalkthroughById = async (req, res) => {
    const { id } = req.params;

    try {
        const brochureWalkthrough = await UserModel.findById(id);
        if (!brochureWalkthrough) {
            return res.status(404).json({ error: 'Brochure_Walkthrough not found' });
        }
        res.json(brochureWalkthrough);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update Brochure_Walkthrough status
exports.updateBrochureWalkthroughStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedBrochureWalkthrough = await UserModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedBrochureWalkthrough) {
            return res.status(404).json({ success: false, message: "Brochure_Walkthrough not found" });
        }

        res.json({ success: true, message: "Brochure_Walkthrough status updated successfully", updatedBrochureWalkthrough });
    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete Brochure_Walkthrough
exports.deleteBrochureWalkthrough = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBrochureWalkthrough = await UserModel.findByIdAndDelete(id);

        if (!deletedBrochureWalkthrough) {
            return res.status(404).json({ success: false, message: "Brochure_Walkthrough not found" });
        }

        if (deletedBrochureWalkthrough.brochure) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'projects', 'brochure', deletedBrochureWalkthrough.brochure);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.json({ success: true, message: "Brochure_Walkthrough deleted successfully", deletedBrochureWalkthrough });
    } catch (err) {
        console.error("Error deleting Brochure_Walkthrough:", err);
        res.status(500).send("Internal Server Error");
    }
};

// Update Brochure_Walkthrough
exports.updateBrochureWalkthrough = async (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body;

    if (req.file) {
        updatedData.brochure = req.file.filename;
    }

    try {
        const updatedDocument = await UserModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        res.json({ success: true, message: "Data updated successfully", data: updatedDocument });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
