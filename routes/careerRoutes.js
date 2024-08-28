const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const upload = require('../middlewares/careerQuery_multerMiddlewares');

// Routes
router.post('/addCareer', upload.single('resume'),  careerController.createCareer);
router.get('/getCareer', careerController.getCareer);
router.delete('/deleteCareer/:id', careerController.deleteCareer);
router.put('/updateCareer/:id', careerController.updateCareer);


module.exports = router;