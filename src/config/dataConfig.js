require('dotenv').config()

const getEnv = (nameEnv) => {
    return process.env[nameEnv]
}

const dbOptionsConfig = {
    dbName: getEnv("DB_NAME"),
}

const dataConfig = {
    SERVER_PORT: getEnv("SERVER_PORT"),
    DB_URI: getEnv("DB_URI"),
    dbOptionsConfig,
}

module.exports = dataConfig