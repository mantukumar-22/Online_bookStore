const express = require('express');
const router = express.Router();

const { registerUser, 
        userLogin, 
        getUserProfile, 
        getUserAllProfile, 
        deleteUserProfile, 
        logoutUser, 
        forgotPassword, 
        resetPassword 
    } = require('../controller/user.js');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', logoutUser);
router.get('/Allprofiles', getUserAllProfile);
router.get('/:id', getUserProfile);
router.delete('/:id', deleteUserProfile);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);




module.exports = router;

