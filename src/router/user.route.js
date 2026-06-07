const express = require('express');
const router = express.Router();

const {registerUser, userLogin, getUserProfile, getUserAllProfile, deleteUserProfile, logoutUser} = require('../controller/user.js');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', logoutUser);
router.get('/Allprofiles', getUserAllProfile);
router.get('/:id', getUserProfile);
router.delete('/:id', deleteUserProfile);




module.exports = router;

