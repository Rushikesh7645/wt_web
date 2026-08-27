const express = require('express');
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, upload } = require('../controllers/eventController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, adminAuth, upload.single('image'), createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', auth, adminAuth, updateEvent);
router.delete('/:id', auth, adminAuth, deleteEvent);

module.exports = router;