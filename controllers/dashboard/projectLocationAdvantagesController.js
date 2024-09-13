const ProjectLocationModel = require('../../models/dashboard/projectLocationAdvantagesModel');

// exports.postLocationAdvantages = async (req, res) => {
//     const { id } = req.params;
//     const { projectname, status, title, proximity, unit } = req.body;

//     if (typeof status !== 'boolean') {
//         return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
//     }

//     try {
//         let project = await ProjectLocationModel.findOne({ projectname });

//         if (project) {
//             const existingIndex = project.data.findIndex(item => item.LocationAdvantagesId === id);
            
//             if (existingIndex !== -1) {
//                 project.data[existingIndex].status = status;
//             } else {
//                 project.data.push({
//                     LocationAdvantagesId: id,
//                     title,
//                     unit,
//                     proximity: proximity || 'Walking',
//                     status
//                 });
//             }

//             await project.save();
//             return res.json({ success: true, message: "Data Updated Successfully" });
//         } else {
//             const newProject = new ProjectLocationModel({
//                 projectname,
//                 data: [{
//                     LocationAdvantagesId: id,
//                     title,
//                     unit,
//                     proximity: proximity || 'Walking',
//                     status
//                 }]
//             });

//             await newProject.save();
//             return res.json({ success: true, message: "New Project Created Successfully" });
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
//     }
// };

exports.postLocationAdvantages = async (req, res) => {
    const { id } = req.params;
    const { projectname, status, title, proximity, unit } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        let project = await ProjectLocationModel.findOne({ projectname });

        if (project) {
            const existingIndex = project.data.findIndex(item => item.LocationAdvantagesId === id);
            
            if (existingIndex !== -1) {
                // Update the status or other fields
                project.data[existingIndex].status = status;
                project.data[existingIndex].title = title || project.data[existingIndex].title;
                project.data[existingIndex].unit = unit || project.data[existingIndex].unit;
                project.data[existingIndex].proximity = proximity || project.data[existingIndex].proximity;
            } else {
                project.data.push({
                    LocationAdvantagesId: id,
                    title,
                    unit,
                    proximity: proximity || 'Walking',
                    status
                });
            }

            await project.save();
            return res.json({ success: true, message: "Data Updated Successfully" });
        } else {
            const newProject = new ProjectLocationModel({
                projectname,
                data: [{
                    LocationAdvantagesId: id,
                    title,
                    unit,
                    proximity: proximity || 'Walking',
                    status
                }]
            });

            await newProject.save();
            return res.json({ success: true, message: "New Project Created Successfully" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
    }
};


exports.getLocationAdvantages = async (req, res) => {
    const { projectname } = req.params;

    try {
        const project = await ProjectLocationModel.findOne({ projectname });

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
    const { locationContent } = req.body;

    if (!projectname) {
        return res.json({ success: false, message: "Project Name is required" });
    }

    try {
        let project = await ProjectLocationModel.findOne({ projectname });

        if (project) {
            project.data1 = [{
                locationContent
            }];

            await project.save();
            return res.json({ success: true, message: "Data Saved Successfully" });
        } else {
            const newProject = new ProjectLocationModel({
                projectname,
                data1: [{
                    locationContent
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