const { Router } = require("express");
const router = Router();
require("dotenv").config();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;


if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(409).json({ msg: "User already exists" }); // Use 409 Conflict
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await User.create({ username, password: hashedPassword });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup failed:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

      
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({ msg: "User does not exist" });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ msg: "Invalid username or password" });
        }

        // JWT Token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "User signed in successfully",
            token: "Bearer " + token,
            user: { username }
        });
    } catch (error) {
        console.error("Signin failed:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { username } = req.headers;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find user and check if course is already purchased
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        if (user.purchasedCourses.includes(courseId)) {
            return res.status(409).json({ message: "Course already purchased" });
        }

        // Add course 
        await User.findOneAndUpdate(
            { username },
            { $push: { purchasedCourses: courseId } },
            { new: true }
        );

        return res.status(201).json({ message: "Course purchased successfully" });
    } catch (error) {
        console.error("Failed to buy course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get Purchased Courses
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    try {
        const { username } = req.headers;

        // Fetch user with populated purchased courses
        const user = await User.findOne({ username })
            .select("purchasedCourses -_id")
            .populate("purchasedCourses", "title description price");

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Purchased courses retrieved successfully",
            purchased: user.purchasedCourses
        });
    } catch (error) {
        console.error("Failed to fetch purchased courses:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
