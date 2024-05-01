class UserController {
    constructor(service) {
        this._service = service
    }

    getUsers = async(request, response) => {
        try{
            const data = await this._service.getUsers()
            console.log(data)
            return response.status(200).json({
                data: data
            }).end()
        }catch(error) {
            console.log(error)
            if (error.statusCode == 500) {
                return response.status(error.statusCode).json({
                    message: error.message
                }).end()
            }
        }     
    }

}
module.exports = UserController