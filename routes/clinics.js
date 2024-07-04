const express = require("express");
const {
  getClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
  getClinicInRadius,
  clinicUploadPhoto,
} = require("../controllers/clinics");

// Use filter middleware
const Clinic = require("../models/Clinic");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routes
const serviceRouter = require("./services");

const router = express.Router();

// Re-route into other resource routers
router.use("/:clinicId/services", serviceRouter);

router.route("/radius/:zipcode/:distance").get(getClinicInRadius);

router.route("/:id/photo").put(clinicUploadPhoto);

router
  .route("/")
  .get(advancedResults(Clinic, "services"), getClinics)
  .post(createClinic);

router.route("/:id").get(getClinic).put(updateClinic).delete(deleteClinic);

module.exports = router;
