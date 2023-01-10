const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next)=>{
 const authHeader = req.headers.authorization 
 if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication invalid')
 }

 const token = authHeader.split(' ')[1]

 try{
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    //attach user to the job routes
    req.user = { name: payload.name, userId: payload.userId}
    next()
 }
 catch(error){
    throw new UnauthenticatedError('Authentication invalid')
 }
}

module.exports = authMiddleware

