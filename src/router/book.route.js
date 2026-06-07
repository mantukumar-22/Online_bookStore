const express = require('express');
const router = express.Router();

const { addBook } = require('../controller/book.Cont.js');
const authMiddleware = require('../middleware/auth.middleware.js');



router.post('/add', authMiddleware, addBook);

module.exports = router;


