const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    }
}, {timestamps : true});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const User = mongoose.model('User', userSchema);

module.exports = User;