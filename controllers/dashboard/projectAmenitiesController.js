const UserModel = require('../../models/dashboard/projectAmenitiesModel');

exports.postProjectAmenities = async (req, res) => {
    const { id } = req.params;
    const { projectname, status } = req.body;

    // Validate boolean status
    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        let project = await UserModel.findOne({ projectname });

        if (project) {
            const existingAmenityIndex = project.data.findIndex(item => item.amenityId === id);

            if (existingAmenityIndex !== -1) {
                project.data[existingAmenityIndex].status = status;
            } else {
                project.data.push({ amenityId: id, status });
            }

            await project.save();
            return res.json({ success: true, message: "Data Updated Successfully" });
        } else {
            const newProject = new UserModel({
                projectname,
                data: [{ amenityId: id, status }]
            });

            await newProject.save();
            return res.json({ success: true, message: "New Project Created Successfully" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
    }
};

exports.getProjectAmenities = async (req, res) => {
    const { projectname } = req.params;

    try {
        const project = await UserModel.findOne({ projectname });

        if (!project) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(project);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Fetching Data" });
    }
};


exports.postContent = async (req, res) => {
    const { projectname } = req.params;
    const { amenityContent } = req.body;

    if (!projectname) {
        return res.json({ success: false, message: "Project Name is required" });
    }

    try {
        let project = await UserModel.findOne({ projectname });

        if (project) {
            project.data1 = [{
                amenityContent
            }];

            await project.save();
            return res.json({ success: true, message: "Amenity Content Updated Successfully" });
        } else {
            const newProject = new UserModel({
                projectname,
                data1: [{
                    amenityContent
                }]
            });

            await newProject.save();
            return res.json({ success: true, message: "New Content Created Successfully" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
    }
};