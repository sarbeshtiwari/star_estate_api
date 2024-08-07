const express = require('express');
const router = express.Router();
const floorPlanController = require('../../controllers/dashboard/projectFloorPlanController');
const upload = require('../../middlewares/floorPlan_multerMiddlewares');

// Routes
router.post('/addFloorPlan', upload.array('image', 10), floorPlanController.addFloorPlan);
router.get('/getFloorPlan', floorPlanController.getAllFloorPlans);
router.get('/getFloorPlan/:project', floorPlanController.getFloorPlansByProject);
router.get('/getFloorPlanByID/:id', floorPlanController.getFloorPlanById);
router.put('/updateFloorPlanStatus/:id', floorPlanController.updateFloorPlanStatus);
router.delete('/deleteFloorPlan/:id', floorPlanController.deleteFloorPlan);
router.put('/updateFloorPlan/:id', upload.array('image', 10), floorPlanController.updateFloorPlan);

module.exports = router;
