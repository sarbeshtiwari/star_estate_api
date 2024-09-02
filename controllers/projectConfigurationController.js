const ProjectConfiguration = require('../models/projectConfigurationModel');



function createSlug(projectConfiguration, location) {
    return `${projectConfiguration} in ${location}`
        .toLowerCase()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
}


  
exports.addProjectConfiguration = async (req, res) => {
    try {
        const { location, data } = req.body;
        const configurationData = JSON.parse(data);

        // Create an array of configuration objects with slug URLs
        const configurations = configurationData.map(item => ({
            metaTitle: item.metaTitle,
            metaKeyword: item.metaKeyword,
            metaDescription: item.metaDescription,
            projectConfiguration: item.projectConfiguration,
            ctcontent: item.ctcontent,
            schema: item.schema,
            slugURL: createSlug(item.projectConfiguration, location),
        }));

        // Process each configuration object
        for (const config of configurations) {
            // Find if a configuration with the same location and projectConfiguration exists
            const existingConfig = await ProjectConfiguration.findOne({
                location: location,
                'data.projectConfiguration': config.projectConfiguration
            });

            if (existingConfig) {
                // Update the existing configuration
                await ProjectConfiguration.updateOne(
                    { location: location, 'data.projectConfiguration': config.projectConfiguration },
                    { $set: { 'data.$': config } }
                );
            } else {
                // Add a new configuration
                await ProjectConfiguration.create({
                    location,
                    data: [config]  // Create a new document with the current configuration
                });
            }
        }

        res.status(201).json({ success: true, message: 'Configuration processed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



exports.getConfiguration = async (req, res) => {
    try {
        const configuration = await ProjectConfiguration.find({});
        res.json(configuration);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectConfigurationBySlugURL = async (req, res) => {
    const { location, slugURL } = req.params;
    console.log(req.params)

    try {
        const projectConfiguration = await ProjectConfiguration.find({
            location: location,
            'data.slugURL': slugURL
        });

        if (!projectConfiguration.length) {
            return res.status(404).json({ error: 'Project Configuration or type not found' });
        }

        res.json(projectConfiguration);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectConfigurationByCity = async (req, res) => {
    const { location } = req.params;

    try {
        // Find all project configurations by the location field
        const projectConfigurations = await ProjectConfiguration.find({ location });

        if (projectConfigurations.length === 0) {
            return res.status(404).json({ error: 'No project configurations found for this location' });
        }

        res.json(projectConfigurations);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProjectByID = async (req, res) => {
    const { id } = req.params;

    try {
        const projectConfigurations = await ProjectConfiguration.findById(id);
        if (!projectConfigurations) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(projectConfigurations);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateProjectConfigurationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedProjectConfiguration = await ProjectConfiguration.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedProjectConfiguration) {
            return res.status(404).json({ success: false, message: "Project Configuration not found" });
        }

        res.json({ success: true, message: "Project Configuration status updated successfully", updatedProjectConfiguration });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteProjectConfiguration = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProjectConfiguration = await ProjectConfiguration.findByIdAndDelete(id);

        if (!deletedProjectConfiguration) {
            return res.status(404).json({ success: false, message: "Project Configuration not found" });
        }

        res.json({ success: true, message: "Project Configuration deleted successfully", deletedProjectConfiguration });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateProjectConfiguration = async (req, res) => {
    const { location, projectConfiguration } = req.params;
    const { data } = req.body;

    let parsedData;

    try {
        // Parse and validate data
        parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
            return res.status(400).json({ success: false, message: "Data must be an array" });
        }

         const existingProjectConfiguration = await ProjectConfiguration.findOne({ location: location });

        if (!existingProjectConfiguration) {
            return res.status(404).json({ success: false, message: "Project Configuration not found" });
        }


        // Update or add new data
        const updatedDataMap = new Map(parsedData.map(item => [item.projectConfiguration, item]));

        existingProjectConfiguration.data = existingProjectConfiguration.data.map(item =>
            updatedDataMap.has(item.projectConfiguration)
                ? { ...item, ...updatedDataMap.get(item.projectConfiguration),
                  }
                : item
        );

        // Add new data that was not previously present
        existingProjectConfiguration.data.push(...parsedData.filter(item => !existingProjectConfiguration.data.some(existingItem => existingItem.projectConfiguration === item.projectConfiguration))
                              .map(item => ({
                                  ...item,
                                 
                              }))
                              );

        // Save the ProjectConfiguration
        await existingProjectConfiguration.save();
        res.json({ success: true, message: "Project Configuration updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};