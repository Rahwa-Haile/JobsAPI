const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')


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
    res.send('login route')
}

module.exports = { register, login }