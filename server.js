const express = require("express");
const dotenv = require("dotenv");

// Route files
const clinics = require("./routes/clinics");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Moute routes
app.use("/api/v1/clinics", clinics);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
