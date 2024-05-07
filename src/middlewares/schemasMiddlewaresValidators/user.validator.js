const codes = require('../../utils/codes')

// TODO: Implementar inyeccion de dependencias para los codigos de errores
class ValidatorSchemaMiddlewares {
    constructor(userSchemas, errorManager) {
        this._userSchemas = userSchemas
        this._errorManager = errorManager
    }

    templateErrors = (errors) => {
        return ['There are errors in the data received', codes.codesErrors.ERROR_DATA_VALIDATION, codes.codesStatus.BAD_REQUEST, errors]
    }

    // TODO: Implementar un template de errores para no repetir lo mismo en cada validacion
    userValidateSchemaCreate = (request, response, next) => {
        try {
            const body = request.body
            const validations = this._userSchemas.createUser.validate(body)
            console.log(validations)
            console.log(validations.error.details)

            if (validations.error) {
                const errors = validations.error.details.map(error => error.message)
                throw new this._errorManager(...this.templateErrors(errors))
            }

        } catch (error) {
            return error.returnServerError(response)
        }
        next()
    }

    userValidateSchemaUpdate = (request, response, next) => {
        console.log('Dentro de middleware')
        try {
            const body = request.body
            const validations = this._userSchemas.updateUser.validate(body)
            if (validations.error) {
                const errors = validations.error.details.map(error => error.message)
                throw new this._errorManager(...this.templateErrors(errors))
            }
        } catch (error) {
            return error.returnServerError(response)
        }
        next()
    }

}

module.exports = ValidatorSchemaMiddlewares