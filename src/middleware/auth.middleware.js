const jwt = require("jsonwebtoken");
const User = require("../model/user.js"); // apne path ke hisab se change karo


const isAuthenticatedUser = async(req, res, next) => {
    try{
        
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unautherized"
            })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedData._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();

    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }

    
}


const authorizeRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please Login First",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role (${req.user.role}) is not allowed to access this resource`,
            });
        }

        next();
    };
}
    




module.exports = { isAuthenticatedUser, authorizeRole };

