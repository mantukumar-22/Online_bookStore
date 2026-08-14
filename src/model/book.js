const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
            trim: true
        },

        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Book price is required"],
            min: [0, "Price cannot be negative"]
        },

        description: {
            type: String,
            required: [true, "Book description is required"],
            trim: true
        },

        category: {
            type: String,
            required: [true, "Book category is required"],
            trim: true
        },

        image: {
            type: String,
            required: [true, "Book image is required"]
        },

        stock: {
            type: Number,
            required: [true, "Book stock is required"],
            min: [0, "Stock cannot be negative"],
            default: 0
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;