const codes = require('../utils/codes')

const validatorSyntaxJSON = (error, request, response, next) => {
    if (error) {
        const type = error.type
        if (type == 'entity.parse.failed') {
            return response.status(codes.codesStatus.BAD_REQUEST).json({
                error: {
                    codeError: codes.codesErrors.JSON_FORMAT_INVALID,
                    message: 'Format of JSON is not valid',
                    details: 'Format of JSON is not valid'
                }
            }).end()
        }
    }
    next()
}

module.exports = {
    validatorSyntaxJSON
}