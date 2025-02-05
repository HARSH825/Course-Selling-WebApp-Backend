require('dotenv').config();
const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
// configDotenv();
mongoose.connect(process.env.MONGODB_URI);

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});


const UserSchema = new mongoose.Schema({
    // Username field for user login
    // Type: String - stores user's username
    username: String,
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

const CourseSchema = new mongoose.Schema({
   
    title: String,
    
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);


const User = mongoose.model('User', UserSchema);


const Course = mongoose.model('Course', CourseSchema);


module.exports = {
    Admin,    
    User,     
    Course    
};
