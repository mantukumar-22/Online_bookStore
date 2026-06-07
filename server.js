const app = require('./src/app.js');
require('dotenv').config();
const connectDB = require('./src/config/db.js')

const port = process.env.PORT;

app.get('/books', (req, res) => {
    res.send('Welcome to the BookStore API');
});

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
