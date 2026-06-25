const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, mobile, email, password} = req.body;

        // check if user already exists
        const isUser = await User.findOne({email});
        if(isUser){
            return res.status(400).json({
                success : false,
                message : 'User already exists with this email'
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            mobile,
            email,
            password : hashedPassword
        })
        await user.save();

        const token = jwt.sign({userId : user._id}, process.env.JWT_KEY, {expiresIn : '1d'});

        // const cookieOptions = {
        //     expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
        // };
        res.cookie('token', token);


        return res.status(201).json({
            success : true,
            message : 'User registered successfully',
            user,
            token,
            cookie: token
        })



    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : 'Error fetching user profiles' + err.message,
        })
    }
}

const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'Invalid email or password'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid email or password'
            })
        }
        const token = jwt.sign({userId : user._id}, process.env.JWT_KEY, {expiresIn : '1d'});
        return res.status(200).json({
            success : true,
            message : 'User logged in successfully',
            user,
            token
        })
    }catch(err) {
        return res.status(500).json({
            success : false,
            message : 'Error fetching user profiles' + err.message,
        })
    }
}

// const updateUserProfile = async (req, res) => {
//     try{
//         const id = req.params.id;
//         const {firstName, lastName, mobile, email} = req.body;
//         const user = await User.findByIdAndUpdate(
//             id,
//             {firstName, lastName, mobile, email},
//             {new : true}
//         )
//         if(!user){
//             return res.status(404).json({
//                 success : false,
//                 message : 'User not found'
//             })
//         }
//         res.status(200).json({
//             success : true,
//             message : 'User profile updated successfully',
//             user
//         })

//     }
//     catch(err){
//         res.status(500).json({
//             success : false,
//             message : 'Error updating user profile' + err.message,
//         })
//     }
// }

const getUserAllProfile = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success : true,
            message : 'User profiles fetched successfully',
            users
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : 'Error fetching user profiles' + err.message,
        })
    }
}

const getUserProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        res.status(200).json({
            success : true,
            message : 'User profile fetched successfully',
            user
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Error fetching user profile' + err.message,
        })
    }
}

const deleteUserProfile = async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        res.status(200).json({
            success : true,
            message : 'User profile deleted successfully',
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Error deleting user profile' + err.message,
        })
    }
}

const logoutUser = async (req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({
            success : true,
            message : 'User logged out successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Error logging out' + err.message,
        })
    }
}

const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }

        const resetToken = jwt.sign({userId : user._id}, process.env.JWT_KEY, {expiresIn : '1h'});
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        await sendEmail({
            email : user.email,
            subject : 'Password Reset Request',
            message
        });

        return res.status(200).json({
            success : true,
            message : 'Password reset email sent successfully'
        })

    }catch(err){
        return res.status(500).json({
            success : false,
            message : 'Error in forgot password' + err.message,
        })
    }
}

const resetPassword = async (req, res) => {
    try{
        const {email, newPassword} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success : true,
            message : 'Password reset successfully'
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : 'Error resetting password' + err.message,
        })
    }
}

module.exports = {
    registerUser,
    userLogin,
    getUserAllProfile,
    getUserProfile,
    deleteUserProfile,
    logoutUser,
    forgotPassword,
    resetPassword
};