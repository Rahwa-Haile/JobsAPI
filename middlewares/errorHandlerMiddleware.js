// const { CustomAPIError } = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next)=>{

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong please try again later'
    }

    if(err.code || err.code === 11000){
        customError.msg = `The ${Object.keys(err.keyValue)} address is already registered, please choose another value`
        customError.statusCode = 400
    }
    
    if(err.name === "ValidationError"){
        // customError.msg = `${Object.values(err.errors)}` //This works too
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode = 400
       
    }
    if(err.name === "CastError"){
        customError.msg = `No item is found with an id ${err.value}`
        customError.statusCode = 404
    }
   
    // if(err instanceof CustomAPIError){
    //     res.status(err.statusCode).send(err.message)
    // }
    res.status(customError.statusCode).json({ msg: customError.msg })
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware