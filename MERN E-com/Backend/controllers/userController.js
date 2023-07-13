const User = require('../models/userModel');

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

        res.status(201).json({
            success: true,
            user,
        });

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
