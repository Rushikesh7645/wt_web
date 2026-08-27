const express = require('express');
const { registerForEvent, getRegistrations, markAttendance, declareWinner, generateParticipationCertificates, getCertificates } = require('../controllers/registrationController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, registerForEvent);
router.get('/event/:eventId', auth, adminAuth, getRegistrations);
router.put('/:id/attendance', auth, adminAuth, markAttendance);
router.put('/:id/winner', auth, adminAuth, declareWinner);
router.post('/event/:eventId/certificates', auth, adminAuth, generateParticipationCertificates);
router.get('/certificates', auth, getCertificates);

module.exports = router;