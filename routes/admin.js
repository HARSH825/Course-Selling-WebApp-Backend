
const { Router } = require("express");
require('dotenv').config();
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course, User } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        
        // Input validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "Admin username already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

        // Create new admin
        const newAdmin = await Admin.create({
            username,
            password:hashedPassword, // Note: In production, hash this password
            createdAt: new Date(),
            lastLogin: null
        });

       res.status(201).json({message:"Admin account created successfully"});
    } catch (error) {
        console.error("Admin signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating admin account",
        });
    }
});



router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    //first validate if this admin exists-> insert adminMiddleware

    try{
        const {title, description,price , imglink} = req.body;

    const courseExists =  await Course.findOne({title});
    if(courseExists)return res.json({msg:"course already exists"});

    //save/create this course in the courses table 
    const createCourse =  await Course.create({
        title,
        description,
        price,
        imglink
    });
    

    return res.status(201).json({
        "message":"Course"+ title  + "created successfully" ,
         "courseID":createCourse._id
    })
    }
    catch(error){
        console.log("Error deteced : ",error);
        return response.status(500).json({
            "message":"Some internal error occured "
        })
    };

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    //adminMiddleware checks if the admin is valid
    const courseData = await Course.find({});  //return the whole course table

    res.status(200).json({courseData});
});


router.post('/signin',async(req,res)=>{
   
    // I will on the first tiime check if the user exists in the db by db call
    const {username, password}= req.body;

    const user = await Admin.findOne({username});
    if(!user)return res.status(403).json({message:"User does not exist"});
    
    if(username!=user.username && password != user.password){
        return res.status(403).json({msg:"Invaild username or password"})
    }

    //reach here if the username and password exists in the db
    //if successfully verified token
     // Generate JWT token
     
     const token = jwt.sign({ username }, process.env.JWT_SECRET); // Signing with secret

     // Return success response
     return res.status(201).json({
         success: true,
         message: "Signed in successfully",
         data: {
             jwttoken:"Bearer "+token
         }
     });

   
    
})
module.exports = router;