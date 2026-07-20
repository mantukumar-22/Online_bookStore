
const express = require("express")

const { registerUser, 
        userLogin, 
        getUserProfile, 
        getUserAllProfile, 
        deleteUserProfile,
        updateUserProfile, 
        logoutUser, 
        forgotPassword, 
        resetPassword 
    } = require('../controller/user.js');

const { isAuthenticatedUser , authorizeRole} = require('../middleware/auth.middleware.js');

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', logoutUser);
router.put('/:id', isAuthenticatedUser, authorizeRole("user"), updateUserProfile);
router.get('/allUserProfile', getUserAllProfile);
router.get('/:id', getUserProfile);
router.delete('/:id', deleteUserProfile);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);




module.exports = router;

