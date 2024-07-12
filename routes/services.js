const express = require("express");
const {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers/services");

const Service = require("../models/Service");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Service, {
      path: "clinic",
      select: "name description",
    }),
    getServices
  )
  .post(protect, authorize("publisher", "admin"), addService);
router
  .route("/:id")
  .get(getService)
  .put(protect, authorize("publisher", "admin"), updateService)
  .delete(protect, authorize("publisher", "admin"), deleteService);

module.exports = router;
