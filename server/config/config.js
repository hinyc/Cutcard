const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
<<<<<<< HEAD
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'Cutcard_development',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
=======
    username: process.env.USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_RDS_USERNAME,
    password: process.env.DATABASE_RDS_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_RDS_USERNAME,
    password: process.env.DATABASE_RDS_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
>>>>>>> 36e09a5f0edf99c62805c22252cb54babbfe724e
  },
};
