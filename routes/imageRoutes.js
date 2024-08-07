const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { imageUpload } = require('../middlewares/events_uploadMiddlewares');

router.post('/uploadEventImages/:id', imageUpload.array('eventImages', 10), imageController.uploadEventImages);
router.get('/getEventImages/:eventId', imageController.getEventImages);
router.put('/updateEventImageStatus/:id', imageController.updateImageStatus);
router.delete('/deleteEventImage/:id', imageController.deleteImage);

module.exports = router;
