const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing demo users
    await User.deleteMany({ email: { $in: ['admin@college.com', 'student@college.com'] } });
    console.log('Cleared existing demo users');

    // Create demo admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@college.com',
      password: adminPassword,
      role: 'admin',
      college: 'Sample College',
      department: 'Administration',
    });
    await admin.save();
    console.log('✓ Demo admin created: admin@college.com / admin123');

    // Create demo student
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = new User({
      name: 'John Doe',
      email: 'student@college.com',
      password: studentPassword,
      role: 'student',
      college: 'Sample College',
      department: 'Computer Science',
    });
    await student.save();
    console.log('✓ Demo student created: student@college.com / student123');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin: admin@college.com / admin123');
    console.log('Student: student@college.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();