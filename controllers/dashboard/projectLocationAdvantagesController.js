const UserModel = require('../../models/dashboard/projectLocationAdvantagesModel');

exports.postLocationAdvantages = async (req, res) => {
    const { id } = req.params;
    const { projectname, status, title, proximity, unit } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        let project = await UserModel.findOne({ projectname });

        if (project) {
            const existingIndex = project.data.findIndex(item => item.LocationAdvantagesId === id);
            
            if (existingIndex !== -1) {
                project.data[existingIndex].status = status;
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
            const newProject = new UserModel({
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
