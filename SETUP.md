# Quick Start Guide - College Event Management System

## Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn

## Step-by-Step Setup

### 1. Start MongoDB
If using local MongoDB:
```bash
# Windows
mongod

# Mac/Linux
mongod
```

Or use MongoDB Atlas (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Update .env file
# Edit backend/.env and set:
# MONGO_URI=mongodb://localhost:27017/college-events
# JWT_SECRET=your-secret-key-here
# PORT=5000

# Create demo users (optional but recommended)
npm run seed

# Start backend server
npm run dev
# Backend runs on http://localhost:5001 (or 5000 if available)
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
# Frontend runs on http://localhost:3000
```

## Login with Demo Accounts

After running `npm run seed`, you can login with:

**Admin Account:**
```
Email: admin@college.com
Password: admin123
```

**Student Account:**
```
Email: student@college.com
Password: student123
```

## Complete User Flow

### For Students:

1. **Register:**
   - Go to http://localhost:3000/register
   - Select "Student" role
   - Fill in details (Name, Email, Password, College, Department)
   - Click "Create Account as Student"
   - Login with your credentials

2. **Browse Events:**
   - Click "Events" in navbar
   - View all available events with category and participant limit
   - Click "View Details" on any event

3. **Register for Event:**
   - On event details page, fill in your information
   - Click "Register"
   - View registered events on dashboard

4. **Download Certificate:**
   - After event (when admin marks you attended)
   - Go to Dashboard
   - Download your certificates

### For Admins:

1. **Register:**
   - Go to http://localhost:3000/register
   - Select "Admin" role
   - Fill in details (Name, Email, Password, College, Department)
   - Click "Create Account as Admin"
   - Login with your credentials

2. **Create Event:**
   - Click "+ New Event" in navbar or dashboard
   - Fill event details:
     - Title and Description
     - Date and Time
     - Venue
     - Category (Technical/Non-Technical/Workshop/Hackathon)
     - Max Participants
     - Upload Image (optional)
   - Click "Create Event"

3. **Manage Events:**
   - View all events on dashboard
   - See participant registrations
   - Delete events as needed

4. **Generate Certificates:**
   - Mark student attendance (View Registrations button)
   - Declare winners if applicable (1st, 2nd, 3rd)
   - Generate participation certificates for attendees

## Available Event Categories

- **Technical** - Coding contests, hackathons, tech talks
- **Non-Technical** - Cultural events, sports, seminars
- **Workshop** - Hands-on training sessions
- **Hackathon** - Competitive programming events

## API Base URL

```
http://localhost:5000/api  (or 5001 if port 5000 is in use)
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, the backend automatically falls back to port 5001
- Update frontend API call in: `frontend/src/utils/api.js` if needed
- Update Dashboard certificate link to use correct port

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in backend/.env
- For MongoDB Atlas, use connection string: `mongodb+srv://username:password@cluster.mongodb.net/college-events`

### Frontend Shows "Cannot reach backend"
- Verify backend is running on correct port
- Check CORS is enabled (it is by default)
- Ensure firewall allows connections

## Project Structure

```
wt_web/
├── backend/
│   ├── controllers/     (Business logic)
│   ├── models/          (Database schemas)
│   ├── routes/          (API endpoints)
│   ├── middleware/      (Auth, validation)
│   ├── config/          (Database config)
│   ├── utils/           (Helpers like PDF generation)
│   ├── seed.js          (Demo data)
│   └── server.js        (Main server)
└── frontend/
    ├── src/
    │   ├── components/   (Reusable components)
    │   ├── pages/        (Page components)
    │   ├── hooks/        (Custom hooks)
    │   ├── utils/        (API client)
    │   └── App.js        (Main app)
    └── package.json
```

## Next Steps

1. Register as both admin and student to test the system
2. Create a test event as admin
3. Register for event as student
4. Test certificate generation
5. Explore all features

Enjoy using College Event Management System!