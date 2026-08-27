# How to Register as Admin and Student

## Overview

The College Event Management System supports two user roles:
- **Student** - Can view events, register, and earn certificates
- **Admin** - Can create events, manage registrations, mark attendance, and generate certificates

Both roles can register through the same registration page.

---

## REGISTER AS STUDENT

### Step 1: Go to Registration Page
1. Click the **Register** button in the navbar
2. Or navigate to: `http://localhost:3000/register`

### Step 2: Select Student Role
- Click the **👨‍🎓 Student** card (it's selected by default)
- You'll see what students can do:
  - View all college events
  - Register for events
  - Receive certificates
  - Track event status

### Step 3: Fill Registration Form
| Field | Example | Notes |
|-------|---------|-------|
| Full Name | John Doe | Your name as shown on certificates |
| Email | john@college.com | Must be unique |
| Password | SecurePass123! | Strong password recommended |
| College | ABC Engineering College | Your college/institution name |
| Department | Computer Science | CSE, ECE, ME, Civil, etc. |

### Step 4: Create Account
- Click **"Create Account as Student"** button
- You'll be redirected to login page
- Success message: "Registration successful! Please login."

### Step 5: Login
- Enter your email and password
- Click **Login** button
- Dashboard will show:
  - ✓ Browse Events
  - ✓ My Registrations
  - ✓ My Certificates

### What Students Can Do
1. **View Events** - Click "Events" to see all available events
   - See category (Technical, Non-Technical, Workshop, Hackathon)
   - See max participants
   - See date, time, venue

2. **Register for Event** - On event details page
   - Your info is pre-filled
   - Click "Register"
   - Get confirmation

3. **View Dashboard** - Click "Dashboard"
   - See registered events
   - Download certificates after attendance

---

## REGISTER AS ADMIN

### Step 1: Go to Registration Page
1. Click **Register** in navbar
2. Or navigate to: `http://localhost:3000/register`

### Step 2: Select Admin Role
- Click the **🔐 Admin** card
- You'll see admin capabilities:
  - Create & manage events
  - View participant registrations
  - Mark attendance
  - Generate certificates
  - Declare winners

### Step 3: Fill Registration Form (Same as Student)
| Field | Example | Notes |
|-------|---------|-------|
| Full Name | Admin User | Any name |
| Email | admin@yourevent.com | Must be unique |
| Password | SecurePass123! | Strong password |
| College | ABC Engineering College | Your college name |
| Department | Administration | Your department |

### Step 4: Create Account
- Click **"Create Account as Admin"** button
- Redirected to login
- Success message appears

### Step 5: Login
- Enter admin email and password
- Click **Login**
- Admin Dashboard shows:
  - ✓ Create Event button
  - ✓ Manage Events
  - ✓ View Registrations

### What Admins Can Do

**1. Create Events** - Click "+ New Event" button
   - Event Title
   - Description (detailed info)
   - Date & Time
   - Venue
   - Category (4 options):
     - Technical (coding, hackathons)
     - Non-Technical (sports, cultural)
     - Workshop (training sessions)
     - Hackathon (competitions)
   - Max Participants (limit)
   - Upload Image (optional)

**2. Manage Events**
   - View all created events
   - See event details
   - Delete events
   - View registrations

**3. Manage Registrations**
   - View all students registered
   - Mark attendance
   - Declare winners (1st, 2nd, 3rd)

**4. Generate Certificates**
   - Two types:
     - **Participation Certificate**: All attendees
     - **Winner Certificate**: Top 3 participants
   - Auto-generated PDFs
   - Students can download from dashboard

---

## QUICK TEST - USE DEMO ACCOUNTS

### Demo Admin Account
```
Email: admin@college.com
Password: admin123
```

### Demo Student Account
```
Email: student@college.com
Password: student123
```

**Where to find these:**
- On Login page, there's a yellow "Demo Credentials" section
- Click on either to auto-fill the fields
- Just hit Login!

---

## Event Categories Explained

| Category | Best For | Examples |
|----------|----------|----------|
| **Technical** | Programming & Tech | Coding contests, AI workshop, Web dev seminar |
| **Non-Technical** | Culture & Sports | Dance competition, Cricket match, Art exhibition |
| **Workshop** | Training & Learning | Resume building, Public speaking, Photography |
| **Hackathon** | Competitive Coding | 24-hr hackathon, Problem solving competition |

---

## Common Tasks After Registration

### As Student:
1. **Login** → Go to "Events" → Find an event → Click "View Details" → Register
2. **Check Status** → Go to "Dashboard" → See registered events
3. **Get Certificate** → After attending, "Dashboard" → Download certificate

### As Admin:
1. **Login** → Click "+ New Event" → Fill form → Create
2. **Manage** → "Dashboard" → View event → See registrations
3. **Certificates** → Mark attendance → Declare winners → Generate & students download

---

## Troubleshooting Registration

### "Email already exists"
- The email is registered
- Try with different email OR
- Go to login and use that email

### "Registration failed"
- Check all fields are filled
- Email format should be valid
- Password should be at least 6 characters
- Try again or refresh page

### Can't find Register button
- Click "Register" in the top navbar
- If logged in, logout first (click your role → Logout)

### Demo accounts not working
- Make sure backend seed script ran: `npm run seed`
- Check MongoDB is connected
- Restart backend: `npm run dev`

---

## Login vs Register

| Feature | Login | Register |
|---------|-------|----------|
| New user? | No | Yes |
| Role selection | No | Yes |
| Sets password | No | Yes |
| Pre-fill email | Only demo | No |

---

## Security Notes

- ✓ Passwords are encrypted and never stored in plain text
- ✓ JWT tokens expire after 1 day
- ✓ Admin role required for event creation/certificate generation
- ✓ Each user email must be unique
- ✓ Passwords should be strong and not shared

---

## Next Steps After Registration

1. **As Student:**
   - Explore Events page
   - Register for an event
   - Check Dashboard
   - Wait for admin to mark attendance
   - Download your certificate

2. **As Admin:**
   - Create your first event
   - Invite students
   - Manage registrations
   - Generate and distribute certificates

---

## Need More Help?

- Check SETUP.md for installation help
- Check README.md for full features
- Review API documentation in README.md

Happy Event Managing!