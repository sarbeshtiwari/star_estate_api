const express = require('express');
const router = express.Router();
const projectReraController = require('../../controllers/dashboard/projectReraController');
const upload = require('../../middlewares/projectRera_multerMiddlewares');

// Add Project Rera
router.post('/addProjectRera', upload.array('image', 10), projectReraController.addProjectRera);

// Fetch all data
router.get('/getProjectRera/:project', projectReraController.getProjectRera);

// Fetch data by ID
router.get('/getProjectReraByID/:id', projectReraController.getProjectReraById);

// Update status
router.put('/updateProjectReraStatus/:id', projectReraController.updateProjectReraStatus);

// Delete data
router.delete('/deleteProjectRera/:id', projectReraController.deleteProjectRera);

// Update data with image
router.put('/updateProjectRera/:id', upload.array('image', 10), projectReraController.updateProjectRera);

module.exports = router;
