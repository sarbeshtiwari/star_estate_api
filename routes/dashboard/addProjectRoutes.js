const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/dashboard/addProjectController');
const upload = require('../../middlewares/addProject_multerMiddlewares');

// Routes
// router.post('/addProject', upload.single('project_logo'), projectController.addProject);
router.post('/addProject', upload.fields([
    { name: 'project_logo', maxCount: 1 },
    { name: 'project_thumbnail', maxCount: 1 },
    { name : 'rera_qr', maxCount: 1}
]),projectController.addProject)
router.get('/getProject', projectController.getProjects);

router.get('/getProjectById/:id', projectController.getProjectById);
router.put('/updateProject/:id', upload.fields([
    { name: 'project_logo', maxCount: 1 },
    { name: 'project_thumbnail', maxCount: 1 },
    { name : 'rera_qr', maxCount: 1}
]), projectController.updateProject);

router.get('/getProjectByType/:property_type', projectController.getProjectByType);
router.put('/updateProjectStatus/:id', projectController.updateProjectStatus);
router.delete('/deleteProject/:id', projectController.deleteProject);
router.put('/updateProjectStatusCategory/:id', projectController.updateProjectStatusCategory);

router.get('/getProjectByLocation/:cityLocation', projectController.getProjectByCity);
router.get('/getLuxuryProject', projectController.getLuxuryProject);

router.get('/getProjectBySlug/:slugURL', projectController.getProjectBySlug);

module.exports = router;
