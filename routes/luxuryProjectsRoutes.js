const express = require('express');
const router = express.Router();
const LuxuryProjectsController = require('../controllers/luxuryProjectsController');

// Routes
router.post('/addLuxuryProjects', LuxuryProjectsController.createLuxuryProjects);
router.get('/getLuxuryProjects', LuxuryProjectsController.getLuxuryProjects);
router.delete('/deleteLuxuryProjects/:id', LuxuryProjectsController.deleteLuxuryProjects);
router.put('/updateLuxuryProjects/:id', LuxuryProjectsController.updateLuxuryProjects);


module.exports = router;