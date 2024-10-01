require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 4000  // Default to 3002 if PORT is not set
};
