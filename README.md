# Course Selling WebApp Backend

A robust backend API system for a course selling platform built with Node.js and Express.js. This system provides comprehensive functionality for course management, user authentication, and admin operations.

## 🚀 Features

- **User Authentication**
  - Secure signup and login for both users and admins
  - JWT-based authentication system
  - Password encryption for enhanced security

- **Course Management**
  - Create, read, update, and delete courses (Admin)
  - List all available courses
  - Detailed course information access
  - Course purchase functionality for users

- **User Management**
  - User profile management
  - Course purchase history
  - Admin dashboard for user management

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm/yarn package manager

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HARSH825/Course-Selling-WebApp-Backend.git
   ```

2. Install dependencies:
   ```bash
   cd Course-Selling-WebApp-Backend
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🔗 API Endpoints

### Authentication Routes

```
POST /admin/signup - Admin registration
POST /admin/login  - Admin login
POST /users/signup - User registration
POST /users/login  - User login
```

### Course Routes

```
GET    /courses        - Get all courses
GET    /courses/:id    - Get specific course
POST   /admin/courses  - Create a new course (Admin only)
PUT    /admin/courses/:id - Update course (Admin only)
```

### User Routes

```
GET    /users/courses     - Get purchased courses
POST   /users/courses/:id - Purchase a course
```

## 🔒 Environment Variables

Create a `.env` file with the following variables:

- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## 💡 Usage Examples

### Admin Login
```javascript
fetch('http://localhost:3000/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin@example.com',
    password: 'password123'
  })
});
```

### Create Course (Admin)
```javascript
fetch('http://localhost:3000/admin/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript',
    price: 29.99,
    imageLink: 'https://example.com/course-image.jpg',
  })
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Harsh** - [GitHub Profile](https://github.com/HARSH825)

## ✨ Acknowledgments

- Inspired by modern e-learning platforms
