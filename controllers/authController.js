const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Original password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password before saving:", hashedPassword);

    const userRole = role || "client"; 
    console.log("User role before saving:", userRole);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole, 
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully!", role: userRole });

  } catch (error) {
    res.status(500).json({ message: "Registration error!", error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    console.log("Login user role:", user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Created token:", token);

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};



module.exports = { register, login };
  