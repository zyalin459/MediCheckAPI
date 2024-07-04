const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  service: {
    type: String,
    trim: true,
    require: [true, "Please add a service name"],
  },
  description: {
    type: String,
    require: [true, "Please add a description"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  insurance: {
    type: Boolean,
    default: true,
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: "Clinic",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
