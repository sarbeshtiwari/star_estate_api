const Project = require('../../models/dashboard/addProjectModel');
const fs = require('fs');
const path = require('path');
const deleteFromCloudinary = require('../../middlewares/delete_cloudinery_image');
const BannerImage = require('../../models/projectBannerImageModel');
const UserModel = require('../../models/dashboard/quickDetailsModel');
const ContentModel = require('../../models/dashboard/projectContentSEOModel');
const WalkthroughModel = require('../../models/dashboard/projectBrochureWalkthroughModel');
const ProjectAmenitiesModel = require('../../models/dashboard/projectAmenitiesModel');
const { FloorPlanModel } = require('../../models/dashboard/projectFloorPlanModel');
const { ProjectsGallery } = require('../../models/dashboard/projectGalleryModel');
const ProjectLocationModel = require('../../models/dashboard/projectLocationAdvantagesModel');






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

        if (!projectName || !projectAddress || !cityLocation ||
            !projectConfiguration || !projectBy || !projectPrice ||
            !rera_no || !property_type) {
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
            locationMap: req.files.locationMap[0].filename,
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
            if (req.files.locationMap && req.files.locationMap[0]) {
                updateData.locationMap = req.files.locationMap[0].filename;
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
        const { status, slugURL } = req.body;
       

        // Validate if the status is boolean
        if (typeof status !== 'boolean') {
           
            return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
        }
        if (slugURL){
            // Find banner images using the slugURL
            const bannerImages = await BannerImage.find({ projectName: slugURL });
            
            // Check if any banner images were found for the given slugURL
            if (bannerImages.length === 0) {
                return res.status(400).json({ success: false, message: "No banner images found for this Project. Please add a banner image first." });
            }

            // Check if there is at least one active banner image (status = true)
            const activeBannerImage = bannerImages.find(banner => banner.status === true);
            
            // If no active banner image is found, return a message to activate one first
            if (!activeBannerImage) {
                return res.status(400).json({ success: false, message: "No active banner image found. Please activate at least one banner image before updating the project status." });
            }

            //quick Details
            const quickDetails = await UserModel.find({ projectname: slugURL });
            if (quickDetails.length === 0) {
                return res.status(400).json({ success: false, message: "No quick details found. Please add it first"});
            }
            const activeQuickDetails = quickDetails.find(details => details.status === true);
            if (!activeQuickDetails) {
                return res.status(400).json({ success: false, message: "No active quick details found. Please activate atleast one to update project status."});
            }

            //description
            const description = await ContentModel.find({ projectname: slugURL });
            if (description.length === 0) {
                return res.status(400).json({ success: false, message: "No Description details found. Please add it first"});
            }
            const activeDescription = description.find(details => details.status === true);
            if (!activeDescription) {
                return res.status(400).json({ success: false, message: "No active Description found. Please activate atleast one to update project status."});
            }

             //walkthrough
             const walkthrough = await WalkthroughModel.find({ projectname: slugURL });
             if (walkthrough.length === 0) {
                 return res.status(400).json({ success: false, message: "No Walkthrough details found. Please add it first"});
             }
             const activeWalkthrough = walkthrough.find(details => details.status === true);
             if (!activeWalkthrough) {
                 return res.status(400).json({ success: false, message: "No active Walkthrough detail found. Please activate atleast one to update project status."});
             }

             //amenitites
            const amenities = await ProjectAmenitiesModel.find({ projectname: slugURL });
             if (amenities.length === 0) {
                return res.status(400).json({ success: false, message: "No Amenities details found. Please add it first"});
            }
            const activeAmenities = amenities.some(amenity => 
                amenity.data.some(detail => detail.status === true)
            );
            if (!activeAmenities) {
                return res.status(400).json({ success: false, message: "No active Amenities detail found. Please activate atleast one to update project status."});
            }

             //floorPlan
             const floorPlan = await FloorPlanModel.find({ projectname: slugURL });
             if (floorPlan.length === 0) {
                return res.status(400).json({ success: false, message: "No Floor Plan details found. Please add it first"});
            }
            const activeFloorPlan = floorPlan.find(details => details.status === true);
            if (!activeFloorPlan) {
                return res.status(400).json({ success: false, message: "No active Floor Plan detail found. Please activate atleast one to update project status."});
            }

              //gallery
              const gallery = await ProjectsGallery.find({ projectname: slugURL });
              if (gallery.length === 0) {
                 return res.status(400).json({ success: false, message: "No Gallery Image details found. Please add it first"});
             }
             const activeGallery = gallery.find(details => details.status === true);
             if (!activeGallery) {
                 return res.status(400).json({ success: false, message: "No active Gallery Image detail found. Please activate atleast one to update project status."});
             }

             //locationAdvantages
             const locationAdvantages = await ProjectLocationModel.find({ projectname: slugURL });
             if (locationAdvantages.length === 0) {
                return res.status(400).json({ success: false, message: "No Location Advantages details found. Please add it first"});
            }
            const activeLocationAdvantages = locationAdvantages.some(location => 
                location.data.some(detail => detail.status === true)
            );
            if (!activeLocationAdvantages) {
                return res.status(400).json({ success: false, message: "No active Location Advantages detail found. Please activate atleast one to update project status."});
            }


        };

        

        // Proceed to update the project's status if an active banner image is found
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true });

        // Check if the project was found and updated
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Return success message after updating the project's status
        res.json({ success: true, message: "Project status updated successfully", updatedProject });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// exports.updateProjectStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         if (typeof status !== 'boolean') {
//             return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
//         }
//         const updatedProject = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true });
//         if (!updatedProject) {
//             return res.status(404).json({ success: false, message: "Project not found" });
//         }
//         res.json({ success: true, message: "Project status updated successfully", updatedProject });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// };

exports.deleteProject = async (req, res) => {
    try {
        // Find the project by ID
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        
        // Get the project slug URL
        const projectSlugURL = project.slugURL;
        
        // Delete project logo, thumbnail, RERA QR, and location map from Cloudinary (if they exist)
        if (project.project_logo) {
            await deleteFromCloudinary(project.project_logo);
        }
        if (project.project_thumbnail) {
            await deleteFromCloudinary(project.project_thumbnail);
        }
        if (project.rera_qr) {
            await deleteFromCloudinary(project.rera_qr);
        }
        if (project.locationMap) {
            await deleteFromCloudinary(project.locationMap);
        }

        // 1. Delete Banner Images and remove from Cloudinary
        const bannerImages = await BannerImage.find({ projectName: projectSlugURL });
        for (const banner of bannerImages) {
            if (banner.imageUrl) {
                await deleteFromCloudinary(banner.imageUrl); // Assuming banner.imageUrl stores the image path in Cloudinary
            }
        }
        await BannerImage.deleteMany({ projectName: projectSlugURL });

        // 2. Delete Floor Plans and remove from Cloudinary
        const floorPlans = await FloorPlanModel.find({ projectname: projectSlugURL });
        for (const floorPlan of floorPlans) {
            if (floorPlan.imageUrl) {
                await deleteFromCloudinary(floorPlan.imageUrl); // Assuming floorPlan.imageUrl stores the image path in Cloudinary
            }
        }
        await FloorPlanModel.deleteMany({ projectname: projectSlugURL });

        // 3. Delete Gallery Images and remove from Cloudinary
        const galleryImages = await ProjectsGallery.find({ projectname: projectSlugURL });
        for (const gallery of galleryImages) {
            if (gallery.imageUrl) {
                await deleteFromCloudinary(gallery.imageUrl); // Assuming gallery.imageUrl stores the image path in Cloudinary
            }
        }
        await ProjectsGallery.deleteMany({ projectname: projectSlugURL });

        // Delete other related documents (without images)
        await UserModel.deleteMany({ projectname: projectSlugURL });
        await ContentModel.deleteMany({ projectname: projectSlugURL });
        await WalkthroughModel.deleteMany({ projectname: projectSlugURL });
        await ProjectAmenitiesModel.deleteMany({ projectname: projectSlugURL });
        await ProjectLocationModel.deleteMany({ projectname: projectSlugURL });

        // Finally, delete the project itself
        await Project.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Project and all related documents (including images) deleted successfully" });

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

exports.getProjectByDeveloper = async (req, res) => {
    try {
        const { slugURL } = req.params;
        const projects = await Project.find({ projectBy: slugURL });
        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this Location" });
        }
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateShowSimilarProp = async (req, res) => {
 
        const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedFAQ = await Project.findByIdAndUpdate(id, {showSimilarProperties: status }, { new: true });
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


// May be not required

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

exports.getNewProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        const newProjects = projects.filter(project => 
            (project.newLaunch_priority !== null && project.newLaunch_priority !== 0) || 
            (project.project_status && project.project_status.includes('new-launch'))
        );
        res.json(newProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


