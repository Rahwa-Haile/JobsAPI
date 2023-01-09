const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt) //Here this is pointing to the document
    next()// It works perfectly without this
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({ userId: this._id, name: this.name }, 'jwtSecret', {expiresIn: '30d'})
}

module.exports = mongoose.model('User', UserSchema)