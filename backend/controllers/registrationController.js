const Registration = require('../models/Registration');
const Event = require('../models/Event');
const Certificate = require('../models/Certificate');
const { generateParticipationCertificate, generateWinnerCertificate } = require('../utils/certificateGenerator');

const registerForEvent = async (req, res) => {
  try {
    const { eventId, name, email, college, department } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if already registered
    const existing = await Registration.findOne({ event: eventId, student: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already registered' });

    // Check max participants
    const count = await Registration.countDocuments({ event: eventId });
    if (count >= event.maxParticipants) return res.status(400).json({ message: 'Event full' });

    const registration = new Registration({
      event: eventId,
      student: req.user._id,
      name,
      email,
      college,
      department,
    });
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId }).populate('student', 'name email');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAttendance = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, { attended: true }, { new: true });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const declareWinner = async (req, res) => {
  try {
    const { rank } = req.body; // '1st', '2nd', '3rd'
    const registration = await Registration.findByIdAndUpdate(req.params.id, { winner: rank }, { new: true }).populate('event');
    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    // Generate certificate
    const certificateId = `CERT-${Date.now()}`;
    const filePath = await generateWinnerCertificate(registration, certificateId, rank);
    const certificate = new Certificate({
      registration: registration._id,
      type: 'winner',
      certificateId,
      filePath,
    });
    await certificate.save();

    res.json({ registration, certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateParticipationCertificates = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId, attended: true, winner: null }).populate('event');
    for (const reg of registrations) {
      const certificateId = `PART-${Date.now()}-${reg._id}`;
      const filePath = await generateParticipationCertificate(reg, certificateId);
      const certificate = new Certificate({
        registration: reg._id,
        type: 'participation',
        certificateId,
        filePath,
      });
      await certificate.save();
    }
    res.json({ message: 'Certificates generated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCertificates = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id }).select('_id');
    const registrationIds = registrations.map((reg) => reg._id);
    const certificates = await Certificate.find({ registration: { $in: registrationIds } });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerForEvent, getRegistrations, markAttendance, declareWinner, generateParticipationCertificates, getCertificates };