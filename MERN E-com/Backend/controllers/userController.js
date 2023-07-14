const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//& Register user ----------------------------------------------------------------------------------------------------------
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


//& Login user ----------------------------------------------------------------------------------------------------------
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

//^ Logout user ----------------------------------------------------------------------------------------------------------
exports.logoutUser = async (req, res) => {
    try {

        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });

    } catch (error) {

    }
}

//* Forgot password ----------------------------------------------------------------------------------------------------------
exports.forgotPassword = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'MERN E-com Password Recovery',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }

    res.status(200).json({
        success: true,
        message: 'Reset password link sent to your email.',
    });

}

//* Reset password (3:00:00)-------------------------------------------------------------------------------------------
exports.resetPassword = async (req, res) => {
    try {
        // Hash URL token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Password reset token is invalid or has expired.',
            });
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password does not match.',
            });
        }

        // Setup new password
        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while resetting the password.',
            error: error.message,
        });
    }
};

//* Get currently logged in user details (accessed only by those who is already logged in)------------------------------
exports.getUserDetails = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//* Update / Change password --------------------------------------------------------------------------------------------
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check previous user password
        const isMatched = await user.comparePassword(req.body.oldPassword);

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password does not match',
            });
        }
        user.password = req.body.newPassword;
        await user.save();
        sendToken(user, 200, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//* Update user profile --------------------------------------------------------------------------------------------
exports.updateProfile = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
        };

        // Update avatar: TODO

        const user = await User.findByIdAndUpdate(
            req.user.id,
            userData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        ).lean(); // Add the 'lean' method to convert to plain JavaScript object

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
};

//! Get all users (only for admin) --------------------------------------------------------------------------------------
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

// !Get SINGLE user(only for admin) --------------------------------------------------------------------------------------
exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

// !Update user role (only for admin) --------------------------------------------------------------------------------------
exports.updateUserRole = async (req, res) => {
    try {
        const newUserData = {
            // name: req.body.name,
            // email: req.body.email,
            role: req.body.role,
        };

        const user = await User.findByIdAndUpdate(
            req.params.id,
            newUserData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error
        });
    }
}

// !Delete user (only for admin) --------------------------------------------------------------------------------------
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error
        });
    }
}