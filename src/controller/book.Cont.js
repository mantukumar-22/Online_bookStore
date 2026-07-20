const Book = require('../model/book.js');
const ApiFeatures = require('../utils/search.js');


const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            book,
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
        const resultPerPage = 5;

        const apiFeature = new ApiFeatures(Book.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        const books = await apiFeature.query;

        return res.status(200).json({
            success: true,
            count: books.length,
            books,
        });
    }
    catch(err){
        return res.status(500).json({ 
            success: false,
            message: 'Failed to fetch books' 
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

const updateBook = async (req, res) => {
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

const deleteBook = async (req, res) => {
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
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};