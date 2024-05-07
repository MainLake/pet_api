const codes = require('../utils/codes')

class errorManager extends Error {
    constructor(message, codeError, codeStatus, details) {
        super(message)
        this.name = "errorManager"
        this.codeError = codeError,
        this.statusCodeError = codeStatus
        this.details = details
    }

    unknwonError = () => {
        return new errorManager(
            'unknownError',
            codes.codesErrors.SERVER_UNKNOWN_ERROR,
            codes.codesStatus.BAD_REQUEST,
            'Contact with the administrator for solition this error or try more last'
        )
    }

    serverError = () => {
        return new errorManager(
            'Server error',
            codes.codesErrors.SERVER_DB_CONNECTION_ERROR,
            codes.codesStatus.INTERNAL_SERVER_ERROR,
            'Server not response'
        )
    }

    returnServerError = (response) => {
        return response.status(this.statusCodeError).json({
            error: {
                codeError: this.codeError,
                message: this.message,
                details: this.details
            }
        }).end()
    }

}

module.exports = errorManager