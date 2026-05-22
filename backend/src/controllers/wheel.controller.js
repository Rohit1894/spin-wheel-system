const wheelService = require("../services/wheel.service");
const asyncHandler = require("../utils/asyncHandler");

const createWheel = asyncHandler(async (req, res) => {
  try {
    const wheel = await wheelService.createWheel();
    res.status(200).json({
      success: true,
      message: "Wheel created",
      wheel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

const getActiveWheel = asyncHandler(async (req, res) => {
  try {
    const wheel = await wheelService.getActiveWheel();
    res.status(200).json({
      success: true,
      message: "Active Wheel",
      wheel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

const joinWheel = asyncHandler(async (req, res) => {
  try {
    const wheel = await wheelService.joinWheel(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Joined wheel",
      wheel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = { createWheel, getActiveWheel, joinWheel };
