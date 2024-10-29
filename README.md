# Course Selling App

## Overview
This project is a Node.js application for role-based authentication, featuring separate routes and authentication for admins and users.

## Features
- Admin and user role-based access.
- JWT authentication for secure endpoints.
- Middleware for verifying users and admins.

## Prerequisites
- [Node.js](https://nodejs.org/) installed (version 20.18.0 or higher).
- [npm](https://www.npmjs.com/) for managing dependencies.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the provided template:
   ```bash
   cp .env.example .env
   ```

   Add your environment variables in `.env`:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application
Start the application with:
```bash
npm start
