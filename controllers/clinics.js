const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Clinic = require("../models/Clinic");
// @desc        Get all clinics
// @route       GET /api/v1/clinics
// @access      Public
// Filter and get the satified data
exports.getClinics = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);

  // Format the filter money format with a dollar sign
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Clinic.find(JSON.parse(queryStr));

  const clinics = await query;

  res.status(200).json({
    success: true,
    size: clinics.length,
    data: clinics,
  });
});

// @desc        Get sinble clinic
// @route       GET /api/v1/clinics/:id
// @access      Public
exports.getClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.findById(req.params.id);

  if (!clinic) {
    return next(
      new ErrorResponse(`Resourse not found with id of ${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, data: clinic });
});

// @desc        Create new clinic
// @route       POST /api/v1/clinics
// @access      Private
exports.createClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.create(req.body);

  res.status(201).json({
    success: true,
    data: clinic,
  });
});

// @desc        Update clinic
// @route       PUT /api/v1/clinics/:id
// @access      Private
exports.updateClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!clinic) {
    return next(
      new ErrorResponse(`Resourse not found with id of ${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, data: clinic });
});

// @desc        Delete clinic
// @route       DELETE /api/v1/clinics/:id
// @access      Private
exports.deleteClinic = asyncHandler(async (req, res, next) => {
  const clinic = await Clinic.findByIdAndDelete(req.params.id);

  if (!clinic) {
    return next(
      new ErrorResponse(`Resourse not found with id of ${req.params.id}`)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc        Get clinics within a radius
// @route       Get /api/v1/clinics/radius/:zipcode/:distance
// @access      Public
exports.getClinicInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of earth
  // Earch Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const clinics = await Clinic.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({ success: true, count: clinics.length, data: clinics });
});
