const Clinic = require("../models/Clinic");
// @desc        Get all clinics
// @route       GET /api/v1/clinics
// @access      Public
exports.getClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json({
      success: true,
      size: clinics.length,
      data: clinics,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: { error } });
  }
};

// @desc        Get sinble clinic
// @route       GET /api/v1/clinics/:id
// @access      Public
exports.getClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    res.status(200).json({ success: true, data: clinic });

    if (!clinic) {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// @desc        Create new clinic
// @route       POST /api/v1/clinics
// @access      Private
exports.createClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.create(req.body);

    res.status(201).json({
      success: true,
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: { error } });
  }
};

// @desc        Update clinic
// @route       PUT /api/v1/clinics/:id
// @access      Private
exports.updateClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: clinic });

    if (!clinic) {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: { error } });
  }
};

// @desc        Delete clinic
// @route       DELETE /api/v1/clinics/:id
// @access      Private
exports.deleteClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });

    if (!clinic) {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
