const { Router } = require('express')

const userServices = require('../services/user.services')
const userModel = require('../models/user.model')
const userControllers = require('../controllers/user.controllers')

const router = Router();
const services = new userServices(userModel)
const controllers = new userControllers(services)

router.get('/', controllers.getUsers)

module.exports = router