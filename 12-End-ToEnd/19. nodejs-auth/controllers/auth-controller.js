const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register user
const registerUser = async (req, res) => {
    console.log(req.body);
    const { username, email, password, role } = req.body;
    try {
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role: role || "user" });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error: error.message });
    }
};

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // create access token
        const accessToken = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });

        res.status(200).json({ message: "User logged in successfully", accessToken: accessToken });
    } catch (error) {
        res.status(400).json({ message: "Error logging in user", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
}