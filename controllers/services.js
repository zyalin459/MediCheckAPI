const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Service = require("../models/Service");
const Clinic = require("../models/Clinic");
const advancedResults = require("../middleware/advancedResults");

// @desc        Get all services
// @route       GET /api/v1/services
// @route       GET /api/v1/clinics/:clinicId/services
// @access      Publicx
exports.getServices = asyncHandler(async (req, res, next) => {
  if (req.params.clinicId) {
    const services = await Service.find({ clinic: req.params.clinicId });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get single service
// @route       GET /api/v1/services/:id
// @access      Public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate({
    path: "clinic",
    select: "name description",
  });

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc        Add service
// @route       POST /api/v1/clinics/:clinicId/services
// @access      Private
exports.addService = asyncHandler(async (req, res, next) => {
  req.body.clinic = req.params.clinicId;

  const clinic = Clinic.findById(req.params.clinicId);

  if (!clinic) {
    return next(
      new ErrorResponse(`No clinic with the id of ${req.params.id}`, 404)
    );
  }

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service,
  });
});

// @desc        update service
// @route       PUT /api/v1/services/:id
// @access      Private
exports.updateService = asyncHandler(async (req, res, next) => {
  let service = Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`, 404)
    );
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc        Delete service
// @route       DELETE /api/v1/services/:id
// @access      Private
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorResponse(`No service with the id of ${req.params.id}`, 404)
    );
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
