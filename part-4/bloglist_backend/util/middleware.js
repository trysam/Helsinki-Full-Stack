const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method),
    logger.info('Path:', request.path),
    logger.info('Message:', request.body),
    logger.info('-----')

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({"error": "unknown endpoint"})
}

const errorHandler = (error, request, response,next) => {
    logger.info('Error Message:', error.message)

    if (error.name === "CastError"){
        response.status(400).send({error:"malformatted id"})
    } if (error.name === "ValidationError"){
        response.status(400).json({error:error.message})
    } if (error.name === 'JsonWebTokenError'){
        response.status(401).json({error: error.message})
    } if (error.name === 'TokenExpiredError'){
        response.status(401).json({error: error.message})
    }

    next(error)
}

const userExtractorFromToken = (request, response, next) => {
    const authorization = request.get('Authorization')

    if (authorization && authorization.startsWith('Bearer ')){
        const token =  authorization.replace('Bearer ', '')
        request.user = jwt.verify(token, process.env.SECRET)
    }

    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractorFromToken 
}