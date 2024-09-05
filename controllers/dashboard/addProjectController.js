const Project = require('../../models/dashboard/addProjectModel');
const fs = require('fs');
const path = require('path');
const deleteFromCloudinary = require('../../middlewares/delete_cloudinery_image');


// Utility function to create a URL slug
const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };



exports.addProject = async (req, res) => {
    try {
        const {
            metaTitle,
            metaKeyword,
            metaDescription,
            projectName,
            projectAddress,
            state,
            cityLocation,
            projectLocality,
            projectConfiguration,
            projectBy,
            projectType,
            projectPrice,
            ivr_no,
            locationMap,
            rera_no,
            reraWebsite,
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
            !projectConfiguration || !projectBy || !projectPrice ||
            !rera_no || !project_status.length || !property_type) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const existingProject = await Project.findOne({ projectName });
        if (existingProject) {
            return res.json({ success: false, message: "Project name already found" });
        }

        const slugURL = createSlug(projectName);

        const project = new Project({
            ...req.body, slugURL,
            
            project_logo: req.files.project_logo[0].filename,
            project_thumbnail: req.files.project_thumbnail[0].filename,
            rera_qr: req.files.rera_qr[0].filename,
            // project_logo: req.file ? req.file.path : null,
            // project_thumbnail: req.file ? req.file.path : null
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
        if (req.files) {
            if (req.files.rera_qr && req.files.rera_qr[0]) {
                updateData.rera_qr = req.files.rera_qr[0].filename;
            }
            if (req.files.project_thumbnail && req.files.project_thumbnail[0]) {
                updateData.project_thumbnail = req.files.project_thumbnail[0].filename;
            }
            if (req.files.project_logo && req.files.project_logo[0]) {
                updateData.project_logo = req.files.project_logo[0].filename;
            }
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
            // const imagePath = path.join(__dirname, '../uploads/projects', project.project_logo);
            await deleteFromCloudinary(project.project_logo);
            // if (fs.existsSync(imagePath)) {
            //     fs.unlinkSync(imagePath);
            // }
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

exports.getProjectByCity = async (req, res) => {
    try {
        const { cityLocation } = req.params;
        const projects = await Project.find({ cityLocation });
        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this Location" });
        }
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getLuxuryProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        const luxuryProjects = projects.filter(project => 
            (project.luxury_priority !== null && project.luxury_priority !== 0) || 
            (project.project_status && project.project_status.includes('luxury'))
        );
        res.json(luxuryProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectBySlug = async (req, res) => {
    const { slugURL } = req.params;

    if (!slugURL || typeof slugURL !== 'string') {
        return res.status(400).send("Invalid URL");
    }

    try {
        const contentSEO = await Project.find({ slugURL: slugURL });

        if (contentSEO.length === 0) {
            return res.status(404).send("No Data found for the given project Name");
        }

        res.json(contentSEO);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send("Internal Server Error");
    }
};