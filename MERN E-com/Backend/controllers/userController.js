const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Email address already exists.',
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: 'this is a sample id',
                url: 'profilepic.jpg'
            }
        });

       sendToken(user, 201, res);

    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({
                success: false,
                message: 'Email address already exists.',
            });
        }

        // Other errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
};


// Login user
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check if email and password is entered by user
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email and password',
            });
        }

        // Finding user in database
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        sendToken(user, 200, res);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });        
    }
}