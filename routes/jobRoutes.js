const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Define routes and attach corresponding controller functions
router.post('/addJob', jobController.addJob);
router.get('/getJobs', jobController.getJobs);
router.get('/getJobByID/:id', jobController.getJobByID);
router.get('/getJobBySlugURL/:slugURL', jobController.getJobBySlugURL);
router.put('/updateJobStatus/:id', jobController.updateJobStatus);
router.delete('/deleteJob/:id', jobController.deleteJob);
router.put('/updateJob/:JobId', jobController.updateJob);

module.exports = router;
