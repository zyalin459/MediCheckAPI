const express = require("express");

const {
  getClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
  getClinicInRadius,
} = require("../controllers/clinics");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getClinicInRadius);
router.route("/").get(getClinics).post(createClinic);
router.route("/:id").get(getClinic).put(updateClinic).delete(deleteClinic);

module.exports = router;
