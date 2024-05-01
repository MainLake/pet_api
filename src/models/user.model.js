const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    account: {
        role: {
            type: String,
            required: true,
            default: 'user',
            enum: ['user', 'collaborator', 'rescuer', 'administrator']
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    contact_data: {
        emails: [
            {
                type: String
            }
        ],
        numbers: [
            {
                type: String
            }
        ],
        social_media: {
            facebook: String,
            x: String,
            whatsapp: String
        }
    }
})

const userModel = model('user', userSchema)

module.exports = userModel