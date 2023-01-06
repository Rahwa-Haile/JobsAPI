const { CustomAPIError, BadRequest, UnauthenticatedError } = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).send(err.message)
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware