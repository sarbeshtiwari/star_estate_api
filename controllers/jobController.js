const JobModel = require('../models/jobModel');
const moment = require('moment');

// Add a job
const addJob = async (req, res) => {
    const { metaTitle, metaKeyword, metaDescription, position, nos, location, qualification, min_exp, description, added_on, status } = req.body;

    if (!location || !position || !nos || !qualification || !min_exp || !description) {
        return res.status(400).json({ success: false, message: "Fill the required field" });
    }

    try {
        const newJob = new JobModel({
            metaTitle,
            metaKeyword,
            metaDescription,
            position,
            nos,
            location,
            qualification,
            min_exp,
            description,
            added_on,
            status
        });

        console.log("New Job Data:", newJob);
        await newJob.save();
        res.json({ success: true, message: "Job added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find({});
        const formattedJobs = jobs.map(job => ({
            ...job.toObject(),
            added_on: moment(job.added_on).format('DD MMMM, YYYY')
        }));
        res.json(formattedJobs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch a job by ID
const getJobByID = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await JobModel.findById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update job status
const updateJobStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedJob = await JobModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.json({ success: true, message: "Job status updated successfully", updatedJob });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const formattedErrors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Delete a job
const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await JobModel.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.json({ success: true, message: "Job deleted successfully", deletedJob });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const formattedErrors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Update job details
const updateJob = async (req, res) => {
    const { JobId } = req.params;
    const { metaTitle, metaKeyword, metaDescription, position, nos, location, qualification, min_exp, description } = req.body;

    if (!location || !position || !nos || !qualification || !min_exp || !description) {
        return res.status(400).json({ success: false, message: "Fill the required field" });
    }

    try {
        const updatedJob = await JobModel.findByIdAndUpdate(JobId, { metaTitle, metaKeyword, metaDescription, position, nos, location, qualification, min_exp, description }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.json({ success: true, message: "Job updated successfully", updatedJob });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: "Duplicate key error: Job with this location and type already exists" });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = {
    addJob,
    getJobs,
    getJobByID,
    updateJobStatus,
    deleteJob,
    updateJob
};
