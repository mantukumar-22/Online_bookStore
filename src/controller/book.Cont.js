const Book = require('../model/book');

const addBook = async (req, res) => {
    try {
        const { title, author, description, price } = req.body;
        const book = new Book({ title, author, description, price });
        await book.save();
        res.status(201).json({ 
            success: true,
            message: 'Book added successfully', book 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Failed to add book' 
        });
    }   
};


module.exports = {
    addBook
};