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
        this.middlewares()
        this.configRoutes()
    }

    configRoutes() {
        this._serverExpress.use('/api/v1', this._routerIndex)
    }

    middlewares() {
        this._serverExpress.use(this._morgan('tiny'))
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