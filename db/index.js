// ==========================================
// DATABASE CONFIGURATION AND SCHEMA DEFINITIONS
// ==========================================

// Import the Mongoose library - an Object Data Modeling (ODM) library for MongoDB and Node.js
// Mongoose provides a straightforward, schema-based solution to model application data
const mongoose = require('mongoose');

// Connect to MongoDB Atlas (Cloud Database)
// Break down of the connection string:
// - mongodb+srv:// -> Protocol for connecting to MongoDB Atlas
// - harsh:signup -> Database username and password
// - cluster0.cgmu4.mongodb.net -> The host address of your MongoDB cluster
// - ?retryWrites=true -> Automatically retry failed write operations
// - w=majority -> Requires acknowledgment from the majority of replica set members
// - appName=Cluster0 -> Identifier for your application in MongoDB logs
mongoose.connect('mongodb+srv://harsh:signup@cluster0.cgmu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/course_selling_app');

// ==========================================
// ADMIN SCHEMA DEFINITION
// ==========================================

// Define the structure for admin documents in the database
// This is a simple schema with basic authentication fields
const AdminSchema = new mongoose.Schema({
    // Username field for admin login
    // Type: String - stores admin's username
    username: String,
    
    // Password field for admin authentication
    // Type: String - stores admin's password
    // Note: In production, this should be hashed for security
    password: String
});

// ==========================================
// USER SCHEMA DEFINITION
// ==========================================

// Define the structure for user documents in the database
// This schema includes authentication fields and a relationship with courses
const UserSchema = new mongoose.Schema({
    // Username field for user login
    // Type: String - stores user's username
    username: String,
    
    // Password field for user authentication
    // Type: String - stores user's password
    // Note: In production, this should be hashed for security
    password: String,
    
    // Array of courses that the user has purchased
    // This creates a relationship between users and courses
    purchasedCourses: [{
        // MongoDB ObjectID type - references another document
        type: mongoose.Schema.Types.ObjectID,
        
        // 'ref' tells Mongoose that this ID refers to the Course model
        // This enables population of course details when querying
        ref: 'Course'   
    }]
});

// ==========================================
// COURSE SCHEMA DEFINITION
// ==========================================

// Define the structure for course documents in the database
// This schema contains all the information about a course
const CourseSchema = new mongoose.Schema({
    // Title of the course
    // Type: String - stores course name/title
    title: String,
    
    // Detailed description of the course
    // Type: String - stores course description, syllabus, etc.
    description: String,
    
    // URL or path to course thumbnail/preview image
    // Type: String - stores the URL to the course image
    imageLink: String,
    
    // Price of the course
    // Type: Number - stores course price (presumably in a specific currency)
    price: Number
});

// ==========================================
// MODEL CREATION
// ==========================================

// Create the Admin model
// This creates a collection named 'admins' in MongoDB
// The model provides an interface for creating, querying, updating, and deleting admin documents
const Admin = mongoose.model('Admin', AdminSchema);

// Create the User model
// This creates a collection named 'users' in MongoDB
// The model provides an interface for managing user documents and their course purchases
const User = mongoose.model('User', UserSchema);

// Create the Course model
// This creates a collection named 'courses' in MongoDB
// The model provides an interface for managing course offerings in the platform
const Course = mongoose.model('Course', CourseSchema);

// ==========================================
// EXPORT MODELS
// ==========================================

// Export all models so they can be imported and used in other files
// This enables modular code organization and separation of concerns
// Usage example: const { User, Course, Admin } = require('./this-file.js');
module.exports = {
    Admin,    // Export Admin model for administrative operations
    User,     // Export User model for user management and authentication
    Course    // Export Course model for course management
};

// ==========================================
// USAGE EXAMPLES (commented out)
// ==========================================

/*
// Create a new course
const newCourse = new Course({
    title: "JavaScript Basics",
    description: "Learn JavaScript fundamentals",
    imageLink: "https://example.com/js-course.jpg",
    price: 29.99
});

// Create a new user
const newUser = new User({
    username: "john_doe",
    password: "hashedPassword123",
    purchasedCourses: [] // Initially empty
});

// Add a course to user's purchased courses
newUser.purchasedCourses.push(newCourse._id);

// Create a new admin
const newAdmin = new Admin({
    username: "admin_user",
    password: "hashedAdminPass123"
});
*/