const Project = require('../../models/dashboard/addProjectModel');
const fs = require('fs');
const path = require('path');

exports.addProject = async (req, res) => {
    try {
        const {
            metaTitle,
            metaKeyword,
            metaDescription,
            projectName,
            projectAddress,
            cityLocation,
            projectLocality,
            projectConfiguration,
            projectBy,
            projectType,
            projectPrice,
            ivr_no,
            locationMap,
            rera_no,
            city_priority,
            luxury_priority,
            newLaunch_priority,
            featured_priority,
            recent_priority,
            residential_priority,
            commercial_priority,
            project_status,
            status,
            property_type
        } = req.body;

        if (!projectName || !projectAddress || !cityLocation || !projectLocality ||
            !projectConfiguration || !projectBy || !projectType || !projectPrice ||
            !rera_no || !project_status.length || !property_type) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const existingProject = await Project.findOne({ projectName });
        if (existingProject) {
            return res.json({ success: false, message: "Project name already found" });
        }

        const project = new Project({
            ...req.body,
            project_logo: req.file ? req.file.path : null
        });

        await project.save();
        res.json({ success: true, message: "Project added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectByType = async (req, res) => {
    try {
        const { property_type } = req.params;
        const projects = await Project.find({ property_type });
        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this property type" });
        }
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            updateData.project_logo = req.file.filename;
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, message: "Project updated successfully", updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (typeof status !== 'boolean') {
            return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, message: "Project status updated successfully", updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        if (project.project_logo) {
            const imagePath = path.join(__dirname, '../uploads/projects', project.project_logo);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Project and associated image deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateProjectStatusCategory = async (req, res) => {
    try {
        const { project_status } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        let updatedProjectStatus;
        if (project.project_status.includes(project_status)) {
            updatedProjectStatus = project.project_status.filter(status => status !== project_status);
        } else {
            updatedProjectStatus = [...project.project_status, project_status];
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, { project_status: updatedProjectStatus }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, message: "Project status updated successfully", updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};