const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Route files
const clinics = require("./routes/clinics");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware, routers below can access to it
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Moute routes
app.use("/api/v1/clinics", clinics);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
