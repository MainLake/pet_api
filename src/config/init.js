const express = require('express')
const { validatorSyntaxJSON } = require('../middlewares/validatorSyntaxBody')
const { validatorJsonVoid } = require('../middlewares/validatorJsonVoid')
const errorMiddleware = require('../middlewares/errorMiddleware')

class App {
    constructor(mongooseClient, serverExpress, dataConfig, routerIndex, morgan) {
        this._mongooseClient = mongooseClient
        this._dataConfig = dataConfig
        this._routerIndex = routerIndex
        this._morgan = morgan
        this._serverExpress = serverExpress()

        this.initializer()        
    }

    initializer() {

        this.middlewaresStart()
        this.configRoutes()
        this.middlewaresEnd()
    }

    configRoutes() {
        this._serverExpress.use('/api/v1', this._routerIndex)
    }

    middlewaresStart() {
        this._serverExpress.use(express.json())
        this._serverExpress.use(validatorSyntaxJSON)
        this._serverExpress.use(validatorJsonVoid)
        this._serverExpress.use(this._morgan('tiny'))
    }
    middlewaresEnd() {
        this._serverExpress.use(errorMiddleware)
    }

    runserver() {
        this._serverExpress.listen(this._dataConfig.SERVER_PORT, () => {
            console.log(`Server running: http://localhost:${this._dataConfig.SERVER_PORT}`)
        })
    }

    start() {
        const dbConection = this.connectToDatabase()
        dbConection.then(() => {
            console.log("Database connected")
            this.runserver()
        })
        .catch((error) => {
            console.log(error)

        })
    }

    async connectToDatabase() {
        return await this._mongooseClient.connect(this._dataConfig.DB_URI, this._dataConfig.dbOptionsConfig)
    }

}

module.exports = App