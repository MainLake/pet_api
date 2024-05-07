const bcrypt = require('bcrypt')

const saltRounds = 10

const cryptPassword = async (password) => {

    try{
        const passwordEncrypted = bcrypt.hash(password, saltRounds)
        console.log(passwordEncrypted)
        return passwordEncrypted
    }catch(error) {
        console.log(error)
    }

}

module.exports = {
    cryptPassword: cryptPassword
}