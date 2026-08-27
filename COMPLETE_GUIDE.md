# 🎓 College Event Management System - Complete Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [User Registration](#user-registration)
3. [Admin Features](#admin-features)
4. [Student Features](#student-features)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Start Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5001 (auto-fallback from 5000)
```

### 2. Start Frontend
```bash
cd frontend
npm start
# Opens http://localhost:3000
```

### 3. Login with Demo Account
- **Admin:** admin@college.com / admin123
- **Student:** student@college.com / student123

Or register new accounts (see below).

---

## 👤 User Registration

### How to Register as STUDENT

1. Click **Register** button in navbar
2. Select **👨‍🎓 Student** role card
3. Fill in form:
   ```
   Full Name: Your Name
   Email: your@email.com
   Password: ••••••
   College: Your College Name
   Department: CSE / ECE / etc
   ```
4. Click **"Create Account as Student"**
5. Login with your credentials

### How to Register as ADMIN

1. Click **Register** button in navbar
2. Select **🔐 Admin** role card
3. Fill in same form as above
4. Click **"Create Account as Admin"**
5. Login with your credentials
6. Access admin dashboard with event creation

### Demo Credentials
On Login page, yellow box shows:
- Admin: admin@college.com / admin123
- Student: student@college.com / student123

Click to auto-fill!

---

## 🎯 Admin Features

### Dashboard
- **+ New Event** button to create events
- List of all created events
- Delete event option
- View registrations button

### Create Event
Click "+ New Event" or go to "/create-event"

Form fields:
```
Event Title *
Description *
Date * (calendar picker)
Time * (time picker)
Venue *
Category * (dropdown):
  - Technical
  - Non-Technical
  - Workshop
  - Hackathon
Max Participants * (number)
Event Image (file upload, optional)
```

### Manage Events
- See all your events on dashboard
- View detailed event info
- See participant list
- Delete events

### Participant Management
- View who registered for each event
- Mark attendance (✓ attended / ✗ not attended)
- Declare winners:
  - 1st place
  - 2nd place (Runner-up)
  - 3rd place

### Certificate Generation
Two types of certificates auto-generated:

1. **Participation Certificate**
   - For all attendees (marked attended)
   - Includes: Name, Event, Date, Certificate ID
   - PDF format

2. **Winner Certificate**
   - For 1st, 2nd, 3rd place winners
   - Includes: Rank, Winner name, Event, Date
   - PDF format

Process:
1. Go to event registrations
2. Mark students as "attended"
3. Declare winners
4. System auto-generates certificates
5. Students see in their dashboard

---

## 🎓 Student Features

### Dashboard
- Welcome message
- Display your name and role
- Blue "Please register or login" area if not logged in
- Certificates section with download links

### Events Page
Browse all available events:
- Event title and description
- Category badge (color-coded)
- Date and venue
- Max participants limit
- "View Details" button

Event filters available:
- Search by title
- Filter by category
- Sort by date

### Event Details Page
Click "View Details" to see:
- Full event description
- Event image (if uploaded)
- Complete date & time
- Venue details
- Category
- Participant limit
- **Registration Form** (pre-filled with your info)

To register:
1. Review your information (auto-filled)
2. Edit if needed (name, email, college, department)
3. Click **"Register"** button
4. Success notification appears

### My Certificates
On Dashboard:
- Shows all earned certificates
- Type: Participation or Winner
- Certificate ID
- Issue date
- **Download** button for PDF

---

## 🎨 Event Categories

| Category | Type | Examples |
|----------|------|----------|
| **Technical** | 💻 | Hackathons, Coding contests, Tech talks |
| **Non-Technical** | 🎭 | Sports, Cultural events, Art |
| **Workshop** | 🛠️ | Training, Seminars, Skill building |
| **Hackathon** | 🏆 | Code competitions, Problem solving |

---

## 📱 UI/UX Features

### Navbar
- Logo with college name
- Home, Events links
- If logged in:
  - Dashboard link
  - Role badge (admin/student)
  - "+ New Event" (admin only)
  - Logout button
- If not logged in:
  - Login link
  - Register button

### Responsive Design
- ✓ Works on desktop
- ✓ Tablet friendly
- ✓ Mobile optimized
- ✓ Tailwind CSS styling

### Notifications
- Success messages (green toast)
- Error messages (red toast)
- Warning messages (yellow toast)
- Auto-dismiss after 3 seconds

### Forms
- Client-side validation
- Required field indicators
- Clear error messages
- Pre-filled data where applicable

---

## 🔒 Security Features

✓ JWT token-based authentication
✓ Password hashing (bcrypt)
✓ Role-based access control
✓ Protected API endpoints
✓ CORS enabled
✓ Secure cookie handling

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - User login
```

### Events
```
GET  /api/events           - List all events
GET  /api/events/:id       - Get event details
POST /api/events           - Create event (Admin)
PUT  /api/events/:id       - Update event (Admin)
DELETE /api/events/:id     - Delete event (Admin)
```

### Registrations & Certificates
```
POST /api/registrations                    - Register for event
GET  /api/registrations/event/:eventId     - Get registrations (Admin)
PUT  /api/registrations/:id/attendance     - Mark attendance (Admin)
PUT  /api/registrations/:id/winner         - Declare winner (Admin)
POST /api/registrations/event/:eventId/certificates - Generate certificates (Admin)
GET  /api/registrations/certificates       - Get user's certificates (Student)
```

---

## 🛠️ Troubleshooting

### Backend Issues

**Port already in use**
- System auto-falls back from 5000 → 5001
- Update .env PORT if needed
- Or kill process on port 5000

**MongoDB not connecting**
- Check MONGO_URI in backend/.env
- Ensure MongoDB is running
- For Atlas: use full connection string

**"Cannot seed database"**
- MongoDB must be running first
- Check connection string
- Run: `npm run seed` again

### Frontend Issues

**Cannot reach backend**
- Verify backend is running
- Check API base URL in: `src/utils/api.js`
- Update port if backend on different port

**CSS not loading**
- Run: `npm run build`
- Check tailwind.config.js
- Clear browser cache

**Login not working**
- Check credentials in database
- Try demo account first
- Check backend is running

### Registration Issues

**"Email already exists"**
- Use different email
- Or login with that email
- Admin can't re-register with same role

**Form validation errors**
- All fields required
- Email format must be valid
- Password needs to be strong
- Check for typos

---

## 📂 File Structure

```
wt_web/
├── backend/
│   ├── controllers/      - Business logic
│   ├── models/           - Database schemas
│   ├── routes/           - API endpoints
│   ├── middleware/       - Authentication
│   ├── config/           - Database setup
│   ├── utils/            - Certificate generation
│   ├── uploads/          - Stored images & PDFs
│   ├── seed.js           - Demo data
│   ├── server.js         - Main server
│   ├── .env              - Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/   - Navbar, Footer
    │   ├── pages/        - All pages
    │   ├── hooks/        - useAuth custom hook
    │   ├── utils/        - API client
    │   ├── App.js        - Main component
    │   ├── index.js      - Entry point
    │   └── index.css     - Tailwind directives
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚦 Complete User Flow

### New Student Workflow
1. Click Register → Select Student → Fill form → Register
2. Login with credentials
3. Go to Events → Browse events
4. Click View Details on event → Fill registration → Register
5. Wait for admin to organize event
6. Admin marks attendance
7. Certificate generated
8. Go to Dashboard → Download certificate

### New Admin Workflow
1. Click Register → Select Admin → Fill form → Register
2. Login with credentials
3. Click "+ New Event"
4. Fill event details → Upload image → Create
5. See event on dashboard
6. Invite students to register
7. Manage registrations → Mark attendance
8. Declare winners (if applicable)
9. Generate certificates
10. Students download from their dashboard

---

## 📞 Support

For issues or questions:
1. Check HOW_TO_REGISTER.md for detailed registration
2. Check SETUP.md for installation help
3. Check README.md for full documentation
4. Review API endpoints above
5. Check browser console for error messages

---

## ✨ Features Summary

- ✓ User authentication (Admin & Student)
- ✓ Event CRUD operations
- ✓ Event registration with duplicate prevention
- ✓ Category-based organization
- ✓ Participant limit enforcement
- ✓ Attendance tracking
- ✓ Winner declaration
- ✓ PDF certificate generation
- ✓ Certificate download
- ✓ Responsive UI
- ✓ Toast notifications
- ✓ Form validation
- ✓ Image upload
- ✓ Role-based access

Enjoy the College Event Management System! 🎉