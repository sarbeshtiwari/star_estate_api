const express = require('express');
const router = express.Router();
const projectGalleryController = require('../../controllers/dashboard/projectGalleryController');
const upload = require('../../middlewares/projectGallery_multerMiddleware');

// Add Project Gallery
router.post('/addProjectGallery', upload.fields([
    { name: 'desktopImage', maxCount: 10 },
    { name: 'mobileImage', maxCount: 10 }
]), projectGalleryController.addProjectGallery);

// Fetch all data
router.get('/getProjectGallery/:project', projectGalleryController.getProjectGallery);

// Fetch data by ID
router.get('/getProjectGalleryByID/:id', projectGalleryController.getProjectGalleryById);

// Update status
router.put('/updateProjectGalleryStatus/:id', projectGalleryController.updateProjectGalleryStatus);

// Update displayHome status
router.put('/updateProjectGalleryHomeStatus/:id', projectGalleryController.updateProjectGalleryHomeStatus);

// Delete data
router.delete('/deleteProjectGallery/:id', projectGalleryController.deleteProjectGallery);

// Update data with image
router.put('/updateProjectGallery/:id',upload.fields([
    { name: 'desktopImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 }
]), projectGalleryController.updateProjectGallery);

router.post('/projectsGalleryContent/:projectname', projectGalleryController.postContent);
router.get('/getGalleryContent/:projectname', projectGalleryController.getContent);


module.exports = router;
