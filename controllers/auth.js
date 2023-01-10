const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')


const register = async (req, res)=>{
    const { name, email, password } = req.body 
    // const { name, email, password } = req.body 
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)
    // const tempUser = { name, email, password: hashedPassword}
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token})
}
const login = async (req, res)=>{
    const { email, password } = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({ user: {name: user.name}, token })
}        

module.exports = { register, login }