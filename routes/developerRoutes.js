const express = require('express');
const router = express.Router();
const upload = require('../middlewares/developer_uploadMiddlewares');
const developerController = require('../controllers/developerController');

// Routes
router.post('/addDeveloper', upload.single('developerLogo'), developerController.createDeveloper);
router.get('/getDeveloper', developerController.getDevelopers);
router.get('/getDeveloperById/:id', developerController.getDeveloperById);
router.put('/updateDeveloper/:id', upload.single('developerLogo'), developerController.updateDeveloper);
router.put('/updateDeveloperStatus/:id', developerController.updateDeveloperStatus);
router.delete('/deleteDeveloper/:id', developerController.deleteDeveloper);

module.exports = router;
