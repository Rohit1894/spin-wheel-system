const Wheel = require("../models/wheel.model");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const { getIO } = require("../socket");

const createWheel = async () => {
  const existingWheel = await Wheel.findOne({
    active: true,
  });

  if (existingWheel) {
    throw new Error("Active wheel already exists");
  }

  const startTime = new Date(Date.now() + 60 * 1000);

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

const joinWheel = async (wheelId, userId) => {
  const wheel = await Wheel.findById(wheelId);

  if (!wheel) {
    throw new Error("Wheel not found");
  }

  if (!wheel.active) {
    throw new Error("Wheel is not active");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const alreadyJoined = wheel.participants.includes(userId);

  if (alreadyJoined) {
    throw new Error("User already joined");
  }

  if (user.coins < wheel.entryFee) {
    throw new Error("Not enough coins");
  }

  user.coins -= wheel.entryFee;

  await user.save();

  wheel.participants.push(userId);

  await wheel.save();

  await Transaction.create({
    userId,

    wheelId,

    amount: wheel.entryFee,

    type: "DEBIT",
  });
  const io = getIO();

  io.to(wheelId).emit("user-joined", {
    message: "New user joined wheel",
    participants: wheel.participants.length,
  });

  return wheel;
};

module.exports = {
  createWheel,
  getActiveWheel,
  joinWheel,
};
