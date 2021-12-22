const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
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
  },
};
