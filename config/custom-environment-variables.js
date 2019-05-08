module.exports = {
    db: {
        host: 'DB_HOST',
        port: 'DB_PORT',
        database: 'DB_NAME',
        username: 'DB_USERNAME',
        password: 'DB_PASSWORD',
        pool: {
            min: "DB_POOL_MIN",
            max: "DB_POOL_MAX",
        }
    },
    jwt: {
        secret: 'JWT_SECRET'
    },
}