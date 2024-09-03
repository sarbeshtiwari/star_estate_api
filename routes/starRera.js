const express = require('express');
const router = express.Router();
const projectReraController = require('../controllers/starReraController');
const upload = require('../middlewares/starRera_middlewares');

// Add Project Rera
router.post('/addStarRera', upload.array('image', 10), projectReraController.addProjectRera);

// Fetch all data
router.get('/getStarRera/', projectReraController.getProjectRera);

// Fetch data by ID
router.get('/getStarReraByID/:id', projectReraController.getProjectReraById);

// Update status
router.put('/updateStarReraStatus/:id', projectReraController.updateProjectReraStatus);

// Delete data
router.delete('/deleteStarRera/:id', projectReraController.deleteProjectRera);

// Update data with image
router.put('/updateStarRera/:id', upload.array('image', 10), projectReraController.updateProjectRera);

module.exports = router;
