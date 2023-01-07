const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 3,
       
    }
})

module.exports = mongoose.model('User', UserSchema)