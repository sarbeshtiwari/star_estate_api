const express = require('express');
const router = express.Router();
const configurationController = require('../controllers/projectConfigurationController');

// Routes
router.post('/addConfiguration', configurationController.addProjectConfiguration);
router.get('/getConfiguration', configurationController.getConfiguration);

router.get('/getConfigurationByCity/:location', configurationController.getProjectConfigurationByCity);
router.put('/updateConfiguration/:id', configurationController.updateProjectConfiguration);
router.get('/getConfigurationByID/:id', configurationController.getProjectByID);

router.get('/getConfigurationBySlug/:location/s:slugURL', configurationController.getProjectConfigurationBySlugURL);
router.put('/updateConfigurationStatus/:id', configurationController.updateProjectConfigurationStatus);

router.delete('/deleteConfiguration/:id', configurationController.deleteProjectConfiguration)

module.exports = router;
