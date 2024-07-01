const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Clinic = require("./models/Clinic");

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const clinics = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/clinics.json`, "utf-8")
);

// Import DB
const importData = async () => {
  try {
    await Clinic.create(clinics);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Import DB
const deleteData = async () => {
  try {
    await Clinic.deleteMany();
    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
