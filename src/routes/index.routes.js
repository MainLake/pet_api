const { Router } = require('express')
const router = Router()

// Importaciones de rutas de la aplicacion
const routerUsers = require('./user.routes')

router.get('/', (request, response) => {
    return response.status(200).json({
        mensaje: "ok"
    }).end()
})

router.use('/user', routerUsers)

module.exports = router
