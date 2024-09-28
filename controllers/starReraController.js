const ProjectsRera = require('../models/starReraModel');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');

// Add Project Rera
exports.addProjectRera = async (req, res) => {
    try {
        const ProjectReraArray = JSON.parse(req.body.data);

        if (!Array.isArray(ProjectReraArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of ProjectRera" });
        }

        ProjectReraArray.forEach((item, index) => {
            if (req.files[index]) {
                item.image = `star_estate/star_rera/${req.files[index].filename}`;
            }
        });

        const newReports = ProjectReraArray.map(item => new ProjectsRera(item));

        await ProjectsRera.insertMany(newReports);

        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Fetch all data
exports.getProjectRera = async (req, res) => {
  

    try {
        const projectRera = await ProjectsRera.find({ });

        res.json(projectRera);
    } catch (err) {
        console.error("Error fetching project Rera:", err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch data by ID
exports.getProjectReraById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await ProjectsRera.findById(id);

        if (!data) {
            return res.status(404).json({ error: "Not Found" });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update status
exports.updateProjectReraStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedData = await ProjectsRera.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data status updated successfully", updatedData });
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

// Delete data
exports.deleteProjectRera = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await ProjectsRera.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }
        if (deletedData.image) {
            
            await deleteFromCloudinary(deletedData.image);
           
        }

        res.json({ success: true, message: "Data deleted successfully", deletedData });
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

// Update data with image
exports.updateProjectRera = async (req, res) => {
    const { id } = req.params;

    try {
        const updates = JSON.parse(req.body.data);

        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of ProjectRera" });
        }

        const existingProjectRera = await ProjectsRera.findById(id);

        if (!existingProjectRera) {
            return res.status(404).json({ success: false, message: "Project Rera not found" });
        }

        updates.forEach((update, index) => {
            if (req.files[index]) {
                update.image = `star_estate/star_rera/${req.files[index].filename}`;
            }
        });

        for (const update of updates) {
            await ProjectsRera.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
