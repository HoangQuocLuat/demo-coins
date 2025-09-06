require('dotenv').config()
module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_DATABASE || 'coinbase',
    dialect: 'postgres',
    logging: false,
    // connectionLimit: 5000,
    // timezone : '+07:00',
    pool: { max: 100, min: 0, idle: 1000 }
}
