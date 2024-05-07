const validatorJsonVoid = (request, response, next) => {
    // TODO: Implement the middleware for validate if the body is void
    if (request.method == "POST" || request.method == "PATCH" || request.method == "PUT") {
        console.log(request.headers['content-type'])
        if(request.headers['content-type']) {
            console.log(typeof request.get('Content-Type'))
            const typeContent = request.headers['content-type']
        }
    }
    next()
}

module.exports = {
    validatorJsonVoid
}