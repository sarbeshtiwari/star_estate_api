const FloorPlanModel = require('../../models/dashboard/projectFloorPlanModel');

exports.addFloorPlan = async (req, res) => {
    try {
        const FloorPlanArray = JSON.parse(req.body.data);

        if (!Array.isArray(FloorPlanArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of FloorPlan" });
        }

        FloorPlanArray.forEach((floorPlan, index) => {
            if (req.files[index]) {
                floorPlan.image = req.files[index].filename;
            }
        });

        const newReports = FloorPlanArray.map(floorPlan => new FloorPlanModel(floorPlan));
        await FloorPlanModel.insertMany(newReports);

        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getAllFloorPlans = async (req, res) => {
    try {
        const floorPlans = await FloorPlanModel.find({});
        res.json(floorPlans);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getFloorPlansByProject = async (req, res) => {
    const { project } = req.params;

    try {
        const floorPlans = await FloorPlanModel.find({ projectname: project });

        if (floorPlans.length === 0) {
            return res.status(404).send("Project not found");
        }

        res.json(floorPlans);
    } catch (err) {
        console.error("Error fetching project Floor Plans:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getFloorPlanById = async (req, res) => {
    const { id } = req.params;

    try {
        const floorPlan = await FloorPlanModel.findById(id);

        if (!floorPlan) {
            return res.status(404).json({ error: "Not Found" });
        }

        res.json(floorPlan);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.updateFloorPlanStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedFloorPlan = await FloorPlanModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedFloorPlan) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data status updated successfully", updatedFloorPlan });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteFloorPlan = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFloorPlan = await FloorPlanModel.findByIdAndDelete(id);

        if (!deletedFloorPlan) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data deleted successfully", deletedFloorPlan });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateFloorPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = JSON.parse(req.body.data);

        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of FloorPlan" });
        }

        const existingFloorPlan = await FloorPlanModel.findById(id);

        if (!existingFloorPlan) {
            return res.status(404).json({ success: false, message: "Floor Plan not found" });
        }

        updates.forEach((update, index) => {
            if (req.files[index]) {
                update.image = req.files[index].filename;
            }
        });

        for (const update of updates) {
            await FloorPlanModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};