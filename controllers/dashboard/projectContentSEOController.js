const UserModel = require('../../models/dashboard/projectContentSEOModel');

// Add ContentSEO
exports.addContentSEO = async (req, res) => {
    const { description, schema, projectname, status } = req.body;
    
    if (!description || !projectname) {
        return res.status(400).json({ success: false, message: "Fill the required field" });
    }
    
    const newReport = new UserModel({ description, schema, projectname, status });
    
    try {
        console.log("New Data:", newReport);
        await newReport.save();
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all ContentSEO by projectName
exports.getContentSEOByProjectName = async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).send("Invalid projectName");
    }

    try {
        const contentSEO = await UserModel.find({ projectname: id });

        if (contentSEO.length === 0) {
            return res.status(404).send("No ContentSEO found for the given projectName");
        }

        res.json(contentSEO);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch ContentSEO by ID
exports.fetchContentSEObyId = async (req, res) => {
    const { id } = req.params;
  
    try {
        const contentSEO = await UserModel.findById(id);
        if (!contentSEO) {
            return res.status(404).json({ error: 'ContentSEO not found' });
        }
        res.json(contentSEO);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update ContentSEO status
exports.updateContentSEOStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedContentSEO = await UserModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedContentSEO) {
            return res.status(404).json({ success: false, message: "ContentSEO not found" });
        }

        res.json({ success: true, message: "ContentSEO status updated successfully", updatedContentSEO });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete ContentSEO
exports.deleteContentSEO = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedContentSEO = await UserModel.findByIdAndDelete(id);

        if (!deletedContentSEO) {
            return res.status(404).json({ success: false, message: "ContentSEO not found" });
        }

        res.json({ success: true, message: "ContentSEO deleted successfully", deletedContentSEO });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update ContentSEO
exports.updateContentSEO = async (req, res) => {
    const { id } = req.params; 
    const { description, schema, status } = req.body;
    
    if (!description) {
        return res.status(400).json({ success: false, message: "Fill the required field" });
    }

    try {
        const updatedDocument = await UserModel.findByIdAndUpdate(
            id, 
            { description, status, schema },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        res.json({ success: true, message: "Data updated successfully", data: updatedDocument });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
