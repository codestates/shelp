require('dotenv').config();

module.exports = {
    development: {
        host: 'localhost',
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
      },
    test: {
        host: 'localhost',
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
};