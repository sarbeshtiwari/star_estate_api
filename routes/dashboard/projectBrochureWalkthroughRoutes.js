const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/brochureWalkthrough_multerMiddlewares');
const brochureWalkthroughController = require('../../controllers/dashboard/projectBrochureWalkthroughController');

// Routes
router.post('/addBrochure_Walkthrough/:projectname', upload.single('brochure'), brochureWalkthroughController.addBrochureWalkthrough);
router.get('/getBrochure_Walkthrough/:id', brochureWalkthroughController.getBrochureWalkthroughByProjectName);
router.get('/fetchBrochure_WalkthroughbyId/:id', brochureWalkthroughController.fetchBrochureWalkthroughById);
router.put('/updateBrochure_WalkthroughStatus/:id', brochureWalkthroughController.updateBrochureWalkthroughStatus);
router.delete('/deleteBrochure_Walkthrough/:id', brochureWalkthroughController.deleteBrochureWalkthrough);
router.put('/updateBrochure_Walkthrough/:id', upload.single('brochure'), brochureWalkthroughController.updateBrochureWalkthrough);

module.exports = router;
