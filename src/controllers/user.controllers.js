const codes = require('../utils/codes')

class UserController {
    constructor(service, bcrypt, schemaValidators) {
        this._service = service
        this._crypt = bcrypt
        this._schemaValidators = schemaValidators
    }

    getUsers = async (request, response, next) => {
        try {
            const data = await this._service.getUsers()
            return response.status(codes.codesStatus.OK).json({
                data: data
            }).end()
        } catch (error) {
            next(error)
        }
    }

    getUser = async (request, response, next) => {
        const { idUser } = request.params
        try {
            const dataUser = await this._service.getUser(idUser)
            return response.status(codes.codesStatus.OK).json({
                data: dataUser
            }).end()
        } catch (error) {
            next(error)
        }

    }

    createUser = async (request, response, next) => {
        const dataBody = request.body
        try {
            dataBody.password = await this._crypt.hash(dataBody.password, 10)
            const dataCreated = await this._service.createUser(dataBody)
            return response.status(codes.codesStatus.CREATED).json({
                message: "User created",
                data: dataCreated
            }).end()
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (request, response, next) => {
        const { idUser } = request.params
        const dataBody = request.body
        try {
            const dataUpdate = await this._service.updateUser(idUser, dataBody)
            return response.status(codes.codesStatus.OK).json({
                data: dataUpdate
            })
        }catch(error) {
            console.log(error)
            next(error)
        }
    }

    deleteUser = async (request, response, next) => {
        const { idUser } = request.params

        try {

            const userEliminated = this._service.deleteUser(idUser)

            console.log(userEliminated)


        }catch(error) {
            console.log(error)            
        }

    }

}
module.exports = UserController