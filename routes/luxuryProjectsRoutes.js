const express = require('express');
const router = express.Router();
const LuxuryProjectsController = require('../controllers/luxuryProjectsController');

// Routes
router.post('/addLuxuryProjects', LuxuryProjectsController.createLuxuryProjects);
router.get('/getLuxuryProjects', LuxuryProjectsController.getLuxuryProjects);
router.get('/deleteLuxuryProjects/:id', LuxuryProjectsController.deleteLuxuryProjects);
router.get('/updateLuxuryProjects/:id', LuxuryProjectsController.updateLuxuryProjects);


module.exports = router;