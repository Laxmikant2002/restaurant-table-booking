# Restaurant Table Booking System - Backend

This is the backend part of the Restaurant Table Booking System project. It is built using Node.js and Express, providing the necessary API endpoints for managing table bookings.

## Features

- Create a new booking
- Retrieve existing bookings
- Cancel a booking

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/restaurant-table-booking-system.git
   ```

2. Navigate to the backend directory:
   ```
   cd restaurant-table-booking-system/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run the following command:
```
npm start
```

The server will run on `http://localhost:3000` by default.

### API Endpoints

- **POST /bookings**: Create a new booking
- **GET /bookings**: Retrieve all bookings
- **DELETE /bookings/:id**: Cancel a booking by ID

### Folder Structure

- `src/app.ts`: Entry point of the application.
- `src/controllers/bookingController.ts`: Contains the logic for handling booking requests.
- `src/routes/bookingRoutes.ts`: Defines the routes for booking operations.
- `src/models/bookingModel.ts`: Defines the schema for booking data.

### License

This project is licensed under the MIT License. See the LICENSE file for details.