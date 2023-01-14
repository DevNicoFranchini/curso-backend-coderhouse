require("dotenv").config({ path: "./src/config/.env" });

const config = {
  port: process.env.PORT || 8080,
  mongodb: process.env.MONGO || "mongodb://localhost:27017",
  mongosessions: process.env.SESSIONS || "mongodb://localhost:27017",
};

module.exports = config;
