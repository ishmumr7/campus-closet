const app = require("./app");

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unahandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server. ${err.message}`);
  console.log(`Unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
