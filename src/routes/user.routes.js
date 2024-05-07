const { Router } = require('express')
const bcrypt = require('bcrypt')

const userValidatorSchemas = require('../schemas/user.shemas')
const userServices = require('../services/user.services')
const userModel = require('../models/user.model')
const userControllers = require('../controllers/user.controllers')
const errorManager = require('../utils/errorManager')

const userSchemaValidator = require('../schemas/user.shemas') 
const ValidatorSchemaMiddlewares = require('../middlewares/schemasMiddlewaresValidators/user.validator')

const router = Router();
const services = new userServices(userModel, errorManager)
const controllers = new userControllers(services, bcrypt, userValidatorSchemas)

const userMiddlewareValidator = new ValidatorSchemaMiddlewares(userSchemaValidator, errorManager)

router.get('/', controllers.getUsers)
router.get('/:idUser', controllers.getUser)
router.post('/', userMiddlewareValidator.userValidateSchemaCreate, controllers.createUser)
router.patch('/:idUser', userMiddlewareValidator.userValidateSchemaUpdate, controllers.updateUser)

module.exports = router