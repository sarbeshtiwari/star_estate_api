const UserModel = require('../../models/dashboard/projectBanksModel');

exports.postProjectBanks = async (req, res) => {
    const { id } = req.params;
    const { projectname, status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        let project = await UserModel.findOne({ projectname });

        if (project) {
            const existingBanksIndex = project.data.findIndex(item => item.BanksId === id);

            if (existingBanksIndex !== -1) {
                project.data[existingBanksIndex].status = status;
            } else {
                project.data.push({ BanksId: id, status });
            }

            await project.save();
            return res.json({ success: true, message: "Data Updated Successfully" });
        } else {
            const newProject = new UserModel({
                projectname,
                data: [{ BanksId: id, status }]
            });

            await newProject.save();
            return res.json({ success: true, message: "New Project Created Successfully" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Data" });
    }
};

exports.postProjectRatings = async (req, res) => {
    const { projectname } = req.params;
    const { accountNumber, IFSCcode, CIFno, bankName, bankAddress, otherDetails } = req.body;

    if (!projectname) {
        return res.json({ success: false, message: "Project Name is required" });
    }

    try {
        // Find the existing project by projectname
        let project = await UserModel.findOne({ projectname });

        if (project) {
            // Update the existing project with new data
            project.accountNumber = accountNumber || project.accountNumber;
            project.IFSCcode = IFSCcode || project.IFSCcode;
            project.CIFno = CIFno || project.CIFno;
            project.bankName = bankName || project.bankName;
            project.bankAddress = bankAddress || project.bankAddress;
            project.otherDetails = otherDetails || project.otherDetails;

            await project.save();
            return res.json({ success: true, message: "Project Ratings Updated Successfully" });
        } else {
            // Create a new project with the provided data
            const newProject = new UserModel({
                projectname,
                accountNumber,
                IFSCcode,
                CIFno,
                bankName,
                bankAddress,
                otherDetails
            });

            await newProject.save();
            return res.json({ success: true, message: "New Project Created Successfully with Ratings" });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: "Error Adding or Updating Ratings Data" });
    }
};


exports.getProjectData = async (req, res) => {
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
