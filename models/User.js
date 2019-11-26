const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    }

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;