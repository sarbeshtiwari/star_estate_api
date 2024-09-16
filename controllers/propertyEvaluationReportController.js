const PropertyEvaluationModel = require('../models/propertyEvaluationReportModel');

// Create and Save a New Query
exports.createEvaluationReport = async (req, res) => {
    const {
        propertyType,
        buildingType,
        unitType,
        area,
        name,
        email,
        phoneNumber,
        propertyAge,
        floorNo,
        totalFloors,
        coveredParkings,
        facing,
        unitNo,
        message,        
        created_at,         
        
    } = req.body;

    if (!name || !phoneNumber || !propertyType || !buildingType || !email || !unitType || !area) {
        return res.status(400).json({ success: false, message: "Name, Phone Number, Email, Property Type, Building Type, Unit Type and Area are required fields" });
    }

    try {
        const newQuery = new PropertyEvaluationModel({
            propertyType,
            buildingType,
            unitType,
            area,
            name,
            email,
            phoneNumber,
            propertyAge,
            floorNo,
            totalFloors,
            coveredParkings,
            facing,
            unitNo,
            message,           
            created_at,             
           
        });


        await newQuery.save();
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Query
exports.getEvaluationReport = async (req, res) => {
    try {
        const Query = await PropertyEvaluationModel.find({});
        res.json(Query);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


// Delete a Query
exports.deleteEvaluationReport = async (req, res) => {
    const { id } = req.params;

    try {
        const Query = await PropertyEvaluationModel.findById(id);
        if (!Query) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }

        await PropertyEvaluationModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Data deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
