const ProjectsGallery = require('../../models/dashboard/projectGalleryModel');
const fs = require('fs');
const path = require('path');
const deleteFromCloudinary = require('../../middlewares/delete_cloudinery_image');

// Add Project Gallery
exports.addProjectGallery = async (req, res) => {
    try {
        const ProjectGalleryArray = JSON.parse(req.body.data);

        if (!Array.isArray(ProjectGalleryArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of ProjectGallery" });
        }

        ProjectGalleryArray.forEach((item, index) => {
            if (req.files[index]) {
                item.image = req.files[index].filename;
            }
        });

        const newReports = ProjectGalleryArray.map(item => new ProjectsGallery(item));

        await ProjectsGallery.insertMany(newReports);

        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Fetch all data
exports.getProjectGallery = async (req, res) => {
    const { project } = req.params;

    try {
        const projectGallery = await ProjectsGallery.find({ projectname: project });

        if (projectGallery.length === 0) {
            return res.status(404).send("Project not found");
        }

        res.json(projectGallery);
    } catch (err) {
        console.error("Error fetching project gallery:", err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch data by ID
exports.getProjectGalleryById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await ProjectsGallery.findById(id);

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
exports.updateProjectGalleryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedData = await ProjectsGallery.findByIdAndUpdate(id, { status }, { new: true });

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

// Update displayHome status
exports.updateProjectGalleryHomeStatus = async (req, res) => {
    const { id } = req.params;
    const { displayHome } = req.body;

    if (typeof displayHome !== 'boolean') {
        return res.status(400).json({ success: false, message: "DisplayHome must be a boolean value (true or false)" });
    }

    try {
        const updatedData = await ProjectsGallery.findByIdAndUpdate(id, { displayHome }, { new: true });

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data displayHome status updated successfully", updatedData });
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
exports.deleteProjectGallery = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await ProjectsGallery.findByIdAndDelete(id);

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
exports.updateProjectGallery = async (req, res) => {
    const { id } = req.params;

    try {
        const updates = JSON.parse(req.body.data);

        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of ProjectGallery" });
        }

        const existingProjectGallery = await ProjectsGallery.findById(id);

        if (!existingProjectGallery) {
            return res.status(404).json({ success: false, message: "ProjectGallery not found" });
        }

        updates.forEach((update, index) => {
            if (req.files[index]) {
                update.image = req.files[index].filename;
            }
        });

        for (const update of updates) {
            await ProjectsGallery.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
