const { cryptPassword } = require('../utils/cryptPassword')
const codes = require('../utils/codes')

class UserService {
    constructor(userModel, errorManager) {
        this._model = userModel
        this._errorManager = errorManager
    }
    async getUsers() {
        try {
            const data = await this._model.find()
            return data
        } catch (error) {
            throw new this._errorManager(
                'Server error',
                codes.codesErrors.SERVER_DB_CONNECTION_ERROR,
                codes.codesStatus.INTERNAL_SERVER_ERROR,
                'Server not response'
            )
        }
    }

    async getUser(idUser) {
        try {
            const data = await this._model.findById(idUser, {
                name: 1,
                lastname: 1,
                account: {
                    email: 1
                }
            })
            if (!data) {
                throw new this._errorManager(
                    'User not found',
                    codes.codesErrors.DB_NOT_FOUND,
                    codes.codesStatus.NOT_FOUND,
                    'The user with the submitted ID is not registered in the system'
                )
            }
            return data
        } catch (error) {

            if (error.name === 'errorManager') {
                throw error
            }
            if (error.kind == 'ObjectId') {
                throw new this._errorManager(
                    'Format of id is incorrect',
                    codes.codesErrors.DB_INVALID_FORMTA_ID,
                    codes.codesStatus.BAD_REQUEST,
                    "The format for id is similar to '66354c3c61673a5bf6484e16'"
                )
            }
            throw new this._errorManager().serverError()
        }
    }

    async createUser(dataRecived) {
        try {
            const passwordEncrypted = await cryptPassword(dataRecived.password)

            const dataUser = {
                name: dataRecived.name,
                lastname: dataRecived.lastname,
                account: {
                    email: dataRecived.email,
                    password: passwordEncrypted
                }
            }

            const data = await this._model.create(dataUser)
            return data

        } catch (error) {
            if (error.code == 11000) {
                throw new this._errorManager(
                    'Email recived is duplicated',
                    codes.codesErrors.DB_DUPLICATED_KEY,
                    codes.codesStatus.BAD_REQUEST,
                    "Email recived is duplicated, try with other email"
                )
            }
            throw new this._errorManager().unknwonError()
        }
    }

    async updateUser(idUser, dataUserUpdate) {
        try {
            const data = await this._model.findOneAndUpdate({ _id: idUser }, dataUserUpdate, {
                new: true,
                runValidators: true
            }).select({
                account: {
                    password: 0
                }
            })

            if (!data) {
                throw new this._errorManager(
                    'User not found',
                    codes.codesErrors.DB_NOT_FOUND,
                    codes.codesStatus.NOT_FOUND,
                    'The user with the submitted ID is not registered in the system'
                )
            }
            return data
        } catch (error) {
            if (error.kind == 'ObjectId') {
                throw new this._errorManager(
                    'Format of id is incorrect',
                    codes.codesErrors.DB_INVALID_FORMTA_ID,
                    codes.codesStatus.BAD_REQUEST,
                    "The format for id is similar to '66354c3c61673a5bf6484e16'"
                )
            }
            throw error
        }

    }

    async deleteUser(idUser) {
        try{

            const userEliminated = this._model.findOneAndDelete({_id: idUser})

            console.log(userEliminated)

            return userEliminated

        }catch(error) {

            if(error.kind == "ObjectId") {
                throw
            }

        }
    }

}

module.exports = UserService