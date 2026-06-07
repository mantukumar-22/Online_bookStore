# BookStore Backend API

This is the backend API for the BookStore application. It provides endpoints for managing users, books, and orders.

This project provides Authentication and Authorization, allowing users to register, log in, and access protected routes based on their roles (e.g., admin, user).

role-based access control is implemented to ensure that only authorized users can perform certain actions, such as adding or deleting books.
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
## Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Install the dependencies:
```bash
npm install
```
3. Set up the environment variables by creating a `.env` file and adding the necessary configuration values.
4. Start the server:
```bash
npm start
```

## Features
- User registration and login
- Role-based access control (admin and user roles)
- CRUD operations for books (admin only)
- Order management (users can place orders, admins can view all orders)
## API Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Log in a user and receive a JWT token
- `POST /api/books`: Add a new book (admin only)
- `GET /api/books`: Get a list of all books
- `GET /api/books/:id`: Get details of a specific book
- `PUT /api/books/:id`: Update a book (admin only)
- `DELETE /api/books/:id`: Delete a book (admin only)
- `POST /api/orders`: Place a new order (user only)