# BookStore Backend

A simple Express.js backend API for a bookstore application. It provides user registration, login, profile management, book and order endpoints, authentication, and password reset functionality.

## Features

- User registration and login with JWT authentication
- User profile CRUD operations
- Protected routes with role-based authorization
- Password reset workflow using email tokens
- Book and order management endpoints

## Project Structure

- `server.js` - Application entry point
- `src/app.js` - Express app configuration and middleware setup
- `src/config/db.js` - MongoDB connection configuration
- `src/controller/` - Route handlers for users, books, and orders
- `src/middleware/` - Authentication and authorization middleware
- `src/model/` - Mongoose schemas for users, books, and orders
- `src/router/` - Express route definitions
- `src/utils/` - Utility helpers such as email sending

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and define the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
```

> Note: Adjust the variable names if your project uses different names.

## Running the Server

```bash
npm start
```

## API Endpoints

### User Routes

- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Log in an existing user
- `POST /api/v1/user/logout` - Log out the current user
- `PUT /api/v1/user/:id` - Update user profile (authenticated, authorized)
- `GET /api/v1/user/:id` - Get a user profile by ID
- `GET /api/v1/user/allUserProfile` - Get all user profiles
- `DELETE /api/v1/user/:id` - Delete a user profile
- `POST /api/v1/user/forgot-password` - Request password reset email
- `PUT /api/v1/user/reset-password/:token` - Reset password with token

## Notes

- The backend uses cookies to store authentication tokens.
- Protect sensitive routes by using JWT middleware and role checks.
- Ensure email credentials are properly configured for password reset emails.

## License

This project is released under the MIT License.
