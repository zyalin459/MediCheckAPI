const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Show all clinics" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Show clinic ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, message: "Create new clinic" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update clinic ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete clinic ${req.params.id}` });
});

module.exports = router;
