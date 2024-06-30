const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Clinic = require("../models/Clinic");
// @desc        Get all clinics
// @route       GET /api/v1/clinics
// @access      Public
exports.getClinics = asyncHandler(async (req, res, next) => {
  const clinics = await Clinic.find();
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
