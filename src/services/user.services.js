class UserService {
    constructor(userModel) {
        this._model = userModel
    }

    async getUsers() {
        try {
            const data = await this._model.find()
            console.log(data)
            return data.data
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Server error"
            throw error
        }
    }
}

module.exports = UserService