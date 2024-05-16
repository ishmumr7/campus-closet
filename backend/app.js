const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();



//config
if (process.env.NODE_ENV !== "PRODUCTION" ) {
  require("dotenv").config({
    path: "backend/config/.env"
  })
}

// Error handler
app.use(ErrorHandler)

module.exports = app;