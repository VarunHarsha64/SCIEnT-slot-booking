# Slot Booking System

This is a Slot Booking System built using Express.js, Node.js, and React. The application allows users to book rooms in designated time slots, with an approval process for bookings by an admin.

## Features

- User registration and authentication
- Room booking with approval workflow
- Cancellation of bookings
- Admin dashboard for managing bookings and approvals
- Automatic slot creation for the upcoming week
- Email notifications for booking approvals

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn for package management

## Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd slot-booking
   

2. **Install dependencies:**

   For the server:
   ```bash
   cd server
   npm install
   ```

   For the client:
   ```bash
   cd client
   npm install
   ```

3. **Create a `.env` file in the `server` directory with the following content:**

   ```plaintext
   PORT=5000
   MONGO_URI='mongodb://127.0.0.1:27017/SCIEnT-slot-booking'
   JWT_SECRET='qwerty'
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

   **Note:** Replace `your_email@gmail.com` and `your_email_password` with your actual email and password for sending approval emails.

## Usage

1. **Start the server:**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the client:**

   ```bash
   cd client
   npm start
   ```

3. **Access the application at** `http://localhost:3000`.

## API Endpoints

- `POST /api/clubs` - Register a new club
- `POST /api/bookings` - Create a new booking request
- `DELETE /api/bookings/:id` - Cancel a booking
- `GET /api/bookings/pending` - Get all pending bookings for admin approval
- `POST /api/bookings/approve` - Approve a booking request

### Sample Request for Booking

```json
{
    "slotTime": "2024-10-19T18:30:00Z",
    "reason": "Team Meeting",
    "room": "Room1"
}
```

## Slot Creation

Slots are automatically created for the upcoming week every Sunday night. Each room has 30-minute slots from Monday to Sunday.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Express.js
- Mongoose
- React
- Nodemailer

```

Feel free to replace `<your-repo-url>` with your actual repository URL and modify any other details as necessary!
