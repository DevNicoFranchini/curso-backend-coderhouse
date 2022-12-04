const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  mongodb: process.env.MONGO || "mongodb://localhost:27017",
};

module.exports = config;
