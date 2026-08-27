# College Event Management System

A full-stack web application for managing college events with user authentication, event registration, and certificate generation.

## Features

- User authentication (Admin/Student roles)
- Event management (CRUD operations)
- Event registration system
- Dashboard for admins and students
- Automatic certificate generation (PDF)
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Tailwind CSS, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, JWT, Multer, PDFKit
- **Database:** MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/college-events
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. Start MongoDB service (if using local MongoDB).

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/event/:eventId` - Get registrations for event (Admin only)
- `PUT /api/registrations/:id/attendance` - Mark attendance (Admin only)
- `PUT /api/registrations/:id/winner` - Declare winner (Admin only)
- `POST /api/registrations/event/:eventId/certificates` - Generate participation certificates (Admin only)
- `GET /api/registrations/certificates` - Get user's certificates

## Database Models

- **User:** name, email, password, role, college, department
- **Event:** title, description, date, time, venue, category, maxParticipants, image, createdBy
- **Registration:** event, student, name, email, college, department, attended, winner
- **Certificate:** registration, type, certificateId, filePath

## Usage & Registration Guide

### Quick Start - Login with Demo Accounts

The application includes demo credentials for testing. Use these to quickly explore the system:

**Admin Account:**
- Email: `admin@college.com`
- Password: `admin123`
- Role: Can create events, manage registrations, and generate certificates

**Student Account:**
- Email: `student@college.com`
- Password: `student123`
- Role: Can view events, register, and download certificates

### How to Register as Student

1. Click **Register** in the navbar
2. Click the **👨‍🎓 Student** role card (selected by default)
3. Fill in the registration form:
   - **Full Name:** Your full name
   - **Email:** Valid email address
   - **Password:** Strong password
   - **College:** Your college name
   - **Department:** Your department (CSE, ECE, ME, etc.)
4. Click **Create Account as Student**
5. You'll be redirected to login page
6. Login with your credentials
7. Access your dashboard to view events and register

### How to Register as Admin

1. Click **Register** in the navbar
2. Click the **🔐 Admin** role card
3. Fill in the registration form (same fields as student)
4. Click **Create Account as Admin**
5. You'll be redirected to login page
6. Login with your credentials
7. Your dashboard will show:
   - **+ New Event** button to create events
   - Manage existing events
   - View participant registrations

### Admin Features

After logging in as admin, you can:

1. **Create Events:**
   - Click "+ New Event" button in navbar or dashboard
   - Fill in event details:
     - Event title and description
     - Date and time
     - Venue location
     - Category (Technical, Non-Technical, Workshop, Hackathon)
     - Maximum participants
     - Event image (optional)
   - Click "Create Event"

2. **Manage Events:**
   - View all created events on dashboard
   - Delete events as needed
   - View participant registrations

3. **Manage Participants:**
   - View all students registered for each event
   - Mark attendance
   - Declare winners (1st, 2nd, 3rd place)

4. **Generate Certificates:**
   - Participation certificates for attendees
   - Winner certificates for top 3 participants
   - Certificates auto-generate and are downloadable

### Student Features

After logging in as student, you can:

1. **Browse Events:**
   - View all available events on /events page
   - See event details: category, date, venue, max participants
   - Click "View Details" for more information

2. **Register for Events:**
   - On event details page, fill in your information
   - Click "Register" to join the event
   - Prevent duplicate registrations automatically

3. **Download Certificates:**
   - After attending an event and receiving certificate
   - Go to Dashboard
   - Download your participation or winner certificates
   - Certificates are in PDF format

### User Account Fields

Both admin and student registrations require:
- **Name:** Full name for display and certificates
- **Email:** For communication and unique identification
- **Password:** For account security
- **College:** Name of your college/institution
- **Department:** Your academic department

### Event Categories

Events are organized into 4 categories:
1. **Technical** - Tech talks, coding competitions
2. **Non-Technical** - Cultural events, sports
3. **Workshop** - Hands-on learning sessions
4. **Hackathon** - Competitive coding events

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License.