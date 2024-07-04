const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Service = require("../models/Service");

// @desc        Get all services
// @route       GET /api/v1/services
// @route       GET /api/v1/clinics/:clinicId/services
// @access      Publicx
exports.getServices = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.clinicId) {
    console.log("Clinic ID:", req.params.clinicId);
    query = Service.find({ clinic: req.params.clinicId });
  } else {
    query = Service.find().populate({
      path: "clinic",
      select: "name description",
    });
  }

  const services = await query;

  console.log(
    `${services.length} services found from clinic ${req.params.clinicId}`
  );

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});
