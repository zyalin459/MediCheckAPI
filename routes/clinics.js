const express = require("express");

const {
  getClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinics");

const router = express.Router();

router.route("/").get(getClinics).post(createClinic);
router.route("/:id").get(getClinic).put(updateClinic).delete(deleteClinic);

module.exports = router;
