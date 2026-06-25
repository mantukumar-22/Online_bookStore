const Book = require('../model/book');

const addBook = async (req, res) => {
    try {
        const { title, author, description, price } = req.body;
        const book = new Book({ title, author, description, price });
        await book.save();
        return res.status(201).json({ 
            success: true,
            message: 'Book added successfully', book 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Failed to add book' 
        });
    }   
};

const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find({});

        return res.json({
            success : true,
            books
        })
    }
    catch(err){
        return res.status(500).json({ 
            success: false,
            message: 'Failed to add book' 
        });
    }
}

const getBookById = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        return res.json({
            success: true,
            book
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch book by ID'
        });
    }

}

const updateBookById = async (req, res) => {
    try{
        const id = req.params.id;
        const { title, author, description, price } = req.body;
        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, description, price },
            { new: true }
        );
        if(!book){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        return res.json({
            success: true,
            message: 'Book updated successfully',
            book
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to update book by ID'
        });
    }
}

const deleteBookById = async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        return res.json({
            success: true,
            message: 'Book deleted successfully'
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Failed to delete book by ID'
        });
    }
}


module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
};