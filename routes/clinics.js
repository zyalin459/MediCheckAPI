const express = require("express");
const {
  getClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
  getClinicInRadius,
} = require("../controllers/clinics");

// Include other resource routes
const serviceRouter = require("./services");

const router = express.Router();

// Re-route into other resource routers
router.use("/:clinicId/services", serviceRouter);

router.route("/radius/:zipcode/:distance").get(getClinicInRadius);

router.route("/").get(getClinics).post(createClinic);

router.route("/:id").get(getClinic).put(updateClinic).delete(deleteClinic);

module.exports = router;
