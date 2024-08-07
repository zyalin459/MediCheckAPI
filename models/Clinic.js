const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const ClinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      unique: true,
      trim: true,
      maxlength: [500, "Description cannot be more than 50 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    locations: {
      type: [String],
      required: true,
      enum: [
        "Los Angeles Area",
        "San Francisco",
        "New York",
        "Brroklyn",
        "Scottsdale",
      ],
    },
    cares: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Primary Care",
        "Women's Care",
        "Surgery Care",
        "Cancer Care",
        "Wellness",
        "Mental Care",
      ],
    },
    member: { type: Boolean, default: false },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create bootcamp slug from the name
ClinicSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
ClinicSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete course when a clinic is deleted
ClinicSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Services being removed from clinic ${this._id}`);
    await this.model("Service").deleteMany({ clinic: this._id });
    next();
  }
);

// Reverse populate wth virtuals
ClinicSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "clinic",
  justOne: false,
});

module.exports = mongoose.model("Clinic", ClinicSchema);
