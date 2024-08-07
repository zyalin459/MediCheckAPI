const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const clinics = require("./routes/clinics");
const services = require("./routes/services");
const auth = require("./routes/auth");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Middleware, routers below can access to it
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Moute routes
app.use("/api/v1/clinics", clinics);
app.use("/api/v1/services", services);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handel unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}.red`);
  //  close server & exit process
  server.close(() => process.exit(1));
});
