const Wheel = require("../models/wheel.model");

const createWheel = async () => {

  const existingWheel = await Wheel.findOne({
    active: true,
  });

  if (existingWheel) {
    throw new Error("Active wheel already exists");
  }

  const startTime = new Date(
    Date.now() + 3 * 60 * 1000
  );

  const newWheel = await Wheel.create({
    status: "WAITING",
    active: true,
    entryFee: 100,
    startTime,
  });

  return newWheel;
};

const getActiveWheel = async () => {

  const wheel = await Wheel.findOne({
    active: true,
  });

  return wheel;
};

module.exports = {
  createWheel,
  getActiveWheel,
};