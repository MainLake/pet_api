const errorMiddleware = (error, request, response, next) => {
   return error.returnServerError(response)
}

module.exports = errorMiddleware