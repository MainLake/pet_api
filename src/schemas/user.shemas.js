const Joi = require('joi')

const createUser = Joi.object({
    email:Joi.string().email()
        .required()
    ,

    password: Joi.string()
        .required()
    ,

    name: Joi.string()
        .required()
    ,

    lastname: Joi.string()
        .required()
    
}).options({
    abortEarly: false
})

const updateUser = Joi.object({

    name: Joi.string(),
    lastname: Joi.string(),
    account: {
        password: Joi.string()
    },
    contatc_data: {
        emails: Joi.array().items(Joi.string()),
        numbers: Joi.array().items(Joi.string()),
        social_media: {
            facebook: Joi.string(),
            x: Joi.string(),
            whatsapp: Joi.string
        }
    }

}).min(1).options({
    abortEarly: false
})

module.exports = {
    createUser,
    updateUser
}