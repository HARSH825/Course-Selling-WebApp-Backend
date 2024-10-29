const { Router } = require("express");
const router = Router();
require('dotenv').config();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS=10;

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
} //DEBUG PURPOSES


// User Routes
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        

        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(200).json({ msg: "User already exists" });

        // Create new user
        const hashedPassword= await bcrypt.hash(password,SALT_ROUNDS);
        const createUser = await User.create({ username, password:hashedPassword });
       return res.status(201).json({message:"User created successfully"});
    } catch (error) {
        console.log("Failed to create user:", error);
        return res.json({ msg: "Failed to create user due to internal server issue" });
    }
});

// Other routes remain unchanged...

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    //the user will be validated first through the middleware 
    //now user will send the courseID as query param
    try{
        const courseId= req.params.courseId;
        const {username} = req.headers ;

        //check if that course exists
        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(400).json({ message: "Course does not exist" });
        }

        //check if user has alredy purchased the course
        const user = await User.findOne({username});
        const alreadyPurchased = user.purchasedCourses.includes(courseId);

        if(alreadyPurchased)return res.json({message:"Course already Purchased"});

        //if not purchased
        
        const addCourseToUser =await  User.findOneAndUpdate({username},{
            $push:{purchasedCourses:courseId} //push the new purchased coure with courseId in the purchasedCourses Array that is a ref to the Courses table
        },
    {
        new:true //option to return the updated document
    }
);
        res.status(201).json({message:"Course purchased successfully"});
        

    }
    catch(error){
        console.log("Failed to buy course:" ,error);
        return res.status(500).json({message:"internal server error"});
    }
    


});

    router.get('/purchasedCourses', userMiddleware, async (req, res) => {
        // Implement fetching purchased courses logic
        ///already checked if the user exists
        try{
            const{username}= req.headers;

            const user= await User.findOne({username})
                                    .select('purchasedCourses -_id') //Only select the purchasedCourses field.Excludeuser's _id (using '-)
                                    .populate('purchasedCourses','title description price');
            //The populate() method in Mongoose is used to automatically replace specified paths in the document with document(s) from other collection(s). 

            return res.status(200).json({message:"The purchased courses are :",
                purchased: user.purchasedCourses
            })
        }
        catch(error){
            console.log("Couldnt fetch the purchased courses by the user : ",error);
            return res.status(500).json({message:"Internal server errror"});
        }
    });

router.post('/signin',async (req,res)=>{

    //on first time login verify if the user exists with the given username and password
    const {username, password}=req.body;

    const user=await User.findOne({username});
    if(!user)return res.status(403).json({msg:"User does not exist"});

    if(username!=user.username && password!=user.password){
        return res.status(403).json({msg:"Invalid username or password"});
    }

    //reach hwere if the user exists
    const token = jwt.sign({ username }, process.env.JWT_SECRET); // Signing the token

    return res.status(201).json({
        message: "User signed in successfully",
        token: "Bearer " + token
    });
    
})
module.exports = router