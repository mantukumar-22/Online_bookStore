const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user.route.js');
const bookRouter = require('./router/book.route.js');


app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api1/books', bookRouter);





module.exports = app;
