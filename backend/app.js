const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Import routes
const user = require("./controller/user");
const seller = require("./controller/seller");
const product = require("./controller/product");
const event = require("./controller/event");

app.use("/api/v2/user", user);
app.use("/api/v2/seller", seller);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);

// Error handler
app.use(ErrorHandler);

module.exports = app;
