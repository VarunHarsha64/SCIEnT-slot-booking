# Slot Booking System

This is a Slot Booking System built using **Express.js**, **Node.js**, and **React**. The application enables users to book rooms in designated time slots, with an admin approval workflow to manage bookings.

## Features

- **User Authentication**: Secure login for both regular users and admins.
- **Slot Booking**: Users can request bookings for specific time slots in available rooms.
- **Admin Approval Workflow**: Admins review and approve or reject booking requests.
- **Cancellation**: Users can cancel bookings up to an hour before the scheduled time.
- **Admin Dashboard**: Manage bookings, approvals, and view pending requests.
- **Automated Weekly Slot Creation**: Slots are generated for the upcoming week every Sunday night.
- **Email Notifications**: Sends emails for booking approvals and cancellations.

---

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn** for package management

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/VarunHarsha64/SCIEnT-slot-booking.git
   cd SCIEnT-slot-booking
   ```

2. **Install Dependencies**

   **For the Server**:
   ```bash
   cd server
   npm install
   ```

   **For the Client**:
   ```bash
   cd client
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `server` directory and add the following configurations:

   ```plaintext
   PORT=5000
   MONGO_URI='mongodb://127.0.0.1:27017/SCIEnT-slot-booking'
   JWT_SECRET='your_jwt_secret'
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

   Replace `your_email@gmail.com` and `your_email_password` with your actual email credentials for sending approval notifications.

---

## Usage

1. **Start the Server**:

   ```bash
   cd server
   npm run dev
   ```

2. **Start the Client**:

   ```bash
   cd client
   npm start
   ```

3. **Access the Application** at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login for both admins and users

### Clubs

- `POST /api/clubs` - Register a new club

### Slots

- `GET /api/clubs/slots/available` - Get all available slots (requires user authentication)

### Bookings

- `POST /api/bookings` - Create a new booking request
- `DELETE /api/bookings/:id` - Cancel a booking (requires user authentication)
- `GET /api/bookings/pending` - Get all pending bookings for admin approval
- `POST /api/admin/approve/:id` - Approve a booking request (admin only)

### Admin

- `POST /api/temp/seed-clubs` - Seed temporary club accounts for testing (passwords specified in temp folder files for development)

### Sample Booking Request

Here’s an example payload for creating a booking:

```json
{
    "slotTime": "2024-10-19T18:30:00Z",
    "reason": "Team Meeting",
    "room": "Room1"
}
```

---

## Testing in Postman

1. **Login as Admin or User**:  
   Use `POST /api/auth/login` to authenticate and get a token for admin or user.

2. **Get Available Slots**:  
   Use `GET /api/clubs/slots/available` to see all open slots (authenticated user only).

3. **Create a Booking**:  
   Use `POST /api/bookings` with the booking details in the request body. This will send a booking request to the admin.

4. **Admin Approval**:  
   After logging in as an admin, call `POST /api/admin/approve/:id` to approve a specific booking. Replace `:id` with the booking ID.

5. **Cancellation**:  
   A user can cancel their booking by calling `DELETE /api/bookings/:id`.

---

## Automated Slot Creation

Every Sunday night, slots are automatically generated for the upcoming week. Slots are created for each room at 30-minute intervals across Monday to Sunday.

---

## Acknowledgments

- **Express.js**
- **Mongoose**
- **React**
- **Nodemailer**
