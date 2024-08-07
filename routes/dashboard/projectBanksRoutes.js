const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/dashboard/projectBanksController');

// Route to handle POST request for project banks
router.post('/projectBanks/:id', projectController.postProjectBanks);

// Route to handle POST request for project ratings
router.post('/projectsBanksData/:projectname', projectController.postProjectRatings);

// Route to get project data
router.get('/getProjectbanksRatings/:projectname', projectController.getProjectData);
router.get('/getprojectBanks/:projectname', projectController.getProjectData);

module.exports = router;
