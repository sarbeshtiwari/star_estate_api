const {ProjectsGallery} = require('../../models/dashboard/projectGalleryModel');
const fs = require('fs');
const path = require('path');
const deleteFromCloudinary = require('../../middlewares/delete_cloudinery_image');
const {GalleryContentModel} = require('../../models/dashboard/projectGalleryModel');


exports.addProjectGallery = async (req, res) => {
    try {
        const ProjectGalleryArray = JSON.parse(req.body.data);

        if (!Array.isArray(ProjectGalleryArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of ProjectGallery" });
        }

        // Process files
        const desktopImage = req.files['desktopImage'] ? req.files['desktopImage'][0] : null;
        const mobileImage = req.files['mobileImage'] ? req.files['mobileImage'][0] : null;

        // Add file paths to the gallery items
        const updatedGalleryArray = ProjectGalleryArray.map(item => {
            return {
                ...item,
                desktopImage: desktopImage ? desktopImage.filename : item.desktopImage,
                mobileImage: mobileImage ? mobileImage.filename : item.mobileImage
            };
        });

        // Create new documents and save them
        const newReports = updatedGalleryArray.map(item => new ProjectsGallery(item));
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
        // Find the project by id to get the projectName
        const project = await ProjectsGallery.findById(id);
        
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const projectname = project.projectname;

        // Find all projects with the same projectName
        const projectsWithSameName = await ProjectsGallery.find({ projectname });

        // Log the project names and their displayHome status
        console.log("Projects with the same name:", projectsWithSameName.map(p => ({ id: p._id, displayHome: p.displayHome })));

        // Check if any project has displayHome set to true and reset it to false (other than the current project)
        for (const otherProject of projectsWithSameName) {
            if (otherProject.displayHome === true && otherProject._id.toString() !== id) {
                await ProjectsGallery.findByIdAndUpdate(otherProject._id, { displayHome: false });
            }
        }

        // Update the displayHome status of the current project
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




exports.updateProjectGalleryAmenityStatus = async (req, res) => {
    const { id } = req.params;
    const { amenityImage } = req.body;

    if (typeof amenityImage !== 'boolean') {
        return res.status(400).json({ success: false, message: "AmenityHome must be a boolean value (true or false)" });
    }

    try {
       const project = await ProjectsGallery.findById(id);
        
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const projectname = project.projectname;

        // Find all projects with the same projectName
        const projectsWithSameName = await ProjectsGallery.find({ projectname });

        // Log the project names and their displayHome status
        console.log("Projects with the same name:", projectsWithSameName.map(p => ({ id: p._id, amenityImage: p.amenityImage })));

        // Check if any project has displayHome set to true and reset it to false (other than the current project)
        for (const otherProject of projectsWithSameName) {
            if (otherProject.amenityImage === true && otherProject._id.toString() !== id) {
                await ProjectsGallery.findByIdAndUpdate(otherProject._id, { amenityImage: false });
            }
        }

        // Update the displayHome status of the current project
        const updatedData = await ProjectsGallery.findByIdAndUpdate(id, { amenityImage }, { new: true });

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
        if (deletedData.desktopImage) {
            
            await deleteFromCloudinary(deletedData.desktopImage);
           
        }
        if (deletedData.mobileImage) {
            
            await deleteFromCloudinary(deletedData.mobileImage);
           
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
            return res.status(400).json({ success: false, message: "Request body must be an array of Project Gallery" });
        }

        const existingProjectGallery = await ProjectsGallery.findById(id);

        if (!existingProjectGallery) {
            return res.status(404).json({ success: false, message: "Project Gallery not found" });
        }

        // Process uploaded files
        const desktopImageFile = req.files['desktopImage'] ? req.files['desktopImage'][0] : null;
        const mobileImageFile = req.files['mobileImage'] ? req.files['mobileImage'][0] : null;


        // Update each entry
        for (const update of updates) {
            if (desktopImageFile) {
                update.desktopImage = desktopImageFile.filename;
            }

            if (mobileImageFile) {
                update.mobileImage = mobileImageFile.filename;
            }

            await ProjectsGallery.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.postContent = async (req, res) => {
    const { projectname } = req.params;
    const { projectGalleryContent } = req.body;

    if (!projectname) {
        return res.json({ success: false, message: "Project Name is required" });
    }

    try {
        let project = await GalleryContentModel.findOne({ projectname });

        if (project) {
            project.data = [{
                projectGalleryContent
            }];

            await project.save();
            return res.json({ success: true, message: "Data Saved Successfully" });
        } else {
            const newProject = new GalleryContentModel({
                projectname,
                data : [{
                    projectGalleryContent
                }]
            });

            await newProject.save();
            return res.json({ success: true, message: "New Data Created Successfully" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
    }
};


exports.getContent = async (req, res) => {
    const { projectname } = req.params;

    if (!projectname) {
        return res.json({ success: false, message: "Project Name is required" });
    }

    try {
        let project = await GalleryContentModel.findOne({ projectname: projectname });
       
        if (!project) {
            return res.json({});
        }
        res.json(project);
        }
    catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error fetching Data" });
    }
};
