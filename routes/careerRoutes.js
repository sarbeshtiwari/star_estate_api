const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const upload = require('../middlewares/careerQuery_multerMiddlewares');

// Routes
router.post('/addCareer', upload.single('resume'), (req, res) => {
    try {
        res.send('File uploaded successfully.');
    } catch (error) {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(500).send(error.message);
        } else {
            // An unknown error occurred.
            res.status(500).send('An error occurred during file upload.');
        }
    }
}, careerController.createCareer);
router.get('/getCareer', careerController.getCareer);
router.delete('/deleteCareer/:id', careerController.deleteCareer);
router.put('/updateCareer/:id', careerController.updateCareer);


module.exports = router;