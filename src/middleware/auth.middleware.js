const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try{
    
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // const cookie = req.cookies.token;
        // if(!cookie){
        //     return res.status(401).json({
        //         success : false,
        //         message : 'Unauthorized'
        //     })
        // }   

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();

        return res.status(200).json({
            success : true,
            message : 'Authorized',
            user : req.user
        })
    }
    catch(err){
        return res.status(401).json({
            success : false,
            message : 'Unauthorized',
            error : err.message
        })
    }

       
}


module.exports = authMiddleware;

