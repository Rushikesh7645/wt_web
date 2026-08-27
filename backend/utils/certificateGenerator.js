const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateParticipationCertificate = (registration, certificateId) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `participation_${certificateId}.pdf`;
    const filePath = path.join(__dirname, '../uploads/certificates', fileName);

    // Ensure certificates directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Certificate design
    doc.fontSize(30).text('Certificate of Participation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('This is to certify that', { align: 'center' });
    doc.moveDown();
    doc.fontSize(25).text(registration.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`has participated in ${registration.event.title}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Date: ${registration.event.date.toDateString()}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Certificate ID: ${certificateId}`, { align: 'center' });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

const generateWinnerCertificate = (registration, certificateId, rank) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `winner_${certificateId}.pdf`;
    const filePath = path.join(__dirname, '../uploads/certificates', fileName);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Certificate design
    doc.fontSize(30).text('Certificate of Achievement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('Congratulations!', { align: 'center' });
    doc.moveDown();
    doc.fontSize(25).text(registration.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`for securing ${rank} place in ${registration.event.title}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Date: ${registration.event.date.toDateString()}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Certificate ID: ${certificateId}`, { align: 'center' });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = { generateParticipationCertificate, generateWinnerCertificate };