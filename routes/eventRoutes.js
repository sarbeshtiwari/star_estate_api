const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { upload } = require('../middlewares/events_uploadMiddlewares');

router.post('/addEvents', upload.single('eventImage'), eventController.createEvent);
router.get('/getEvents', eventController.getEvents);
router.get('/getEventById/:id', eventController.getEventById);
router.get('/getEventBySlugURL/:slugURL', eventController.getEventBySlugURL);
router.put('/updateEvent/:id', upload.single('eventImage'), eventController.updateEvent);
router.put('/updateEventStatus/:id', eventController.updateEventStatus);
router.delete('/deleteEvent/:id', eventController.deleteEvent);

module.exports = router;
