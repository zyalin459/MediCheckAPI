// @desc        Get all clinics
// @route       GET /api/v1/clinics
// @access      Public
exports.getClinics = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all clinics" });
};

// @desc        Get sinble clinic
// @route       GET /api/v1/clinics/:id
// @access      Public
exports.getClinic = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Show clinic ${req.params.id}` });
};

// @desc        Create new clinic
// @route       POST /api/v1/clinics
// @access      Private
exports.createClinic = (req, res, next) => {
  res.status(200).json({ success: true, message: "Create new clinics" });
};

// @desc        Update clinic
// @route       PUT /api/v1/clinics/:id
// @access      Private
exports.updateClinic = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update clinic ${req.params.id}` });
};

// @desc        Delete clinic
// @route       DELETE /api/v1/clinics/:id
// @access      Private
exports.deleteClinic = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete clinic ${req.params.id}` });
};
