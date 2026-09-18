require("dotenv").config();

module.exports = {
  MONGO_LINK: process.env.DB_LINK,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
};