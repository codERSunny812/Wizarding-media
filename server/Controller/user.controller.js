import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/utils.js';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        console.log("start checking the new user")
        const existingUser = await User.findOne({ email });
        console.log("checking done")
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        console.log("hashing the password")
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("password hashing done")

        console.log("creating new user")
        const newUser = await User.create({ email, password: hashedPassword });

        console.log("new user creation done");

        console.log("sending the new user info")
        res.status(201).json({ 
            user: { id: newUser._id, username: newUser.username },
            message:"account created successfully"
         });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
