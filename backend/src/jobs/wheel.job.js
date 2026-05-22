const Wheel = require("../models/wheel.model");
const shuffleArray = require("../utils/shuffle");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
// const { getIO } = require("../socket");

const processWheels = async () => {
  try {
    const wheels = await Wheel.find({
      active: true,
      status: "WAITING",
    });

    for (const wheel of wheels) {
      const now = new Date();

      if (now >= wheel.startTime) {
        if (wheel.participants.length < 3) {
          await refundPlayers(wheel);
          wheel.status = "ABORTED";

          wheel.active = false;

          await wheel.save();

          console.log("Wheel aborted");
        } else {
          wheel.status = "RUNNING";
          wheel.startedAt = new Date();

          const shuffledPlayers = shuffleArray(wheel.participants);

          wheel.eliminationOrder = shuffledPlayers;

          await wheel.save();

          console.log("Wheel started");
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const refundPlayers = async (wheel) => {
  for (const userId of wheel.participants) {
    const user = await User.findById(userId);

    if (!user) continue;

    user.coins += wheel.entryFee;

    await user.save();
    await Transaction.create({
      wheelId: wheel._id,
      userId: userId,
      amount: wheel.entryFee,
      type: "REFUND",
    });

    console.log("Refund sent");
  }
};

const giveWinnerReward = async (wheel) => {
  const winner = await User.findById(wheel.winner);

  if (!winner) {
    console.log("Winner not found");

    return;
  }

  console.log("Winner coins before:", winner.coins);

  console.log("Winner pool:", wheel.winnerPool);

  winner.coins += wheel.winnerPool;

  await winner.save();

  console.log("Winner coins after:", winner.coins);

  await Transaction.create({
    wheelId: wheel._id,

    userId: winner._id,

    amount: wheel.winnerPool,

    type: "CREDIT",
  });

  console.log("Winner reward given");
};

const processRunningGames = async () => {
  try {
    const wheels = await Wheel.find({
      status: "RUNNING",
      active: true,
    });

    for (const wheel of wheels) {
      const now = Date.now();

      const lastTime = wheel.lastEliminationAt
        ? new Date(wheel.lastEliminationAt).getTime()
        : 0;

      if (now - lastTime >= 7000) {
        if (wheel.eliminationOrder.length > 1) {
          const eliminatedUser = wheel.eliminationOrder.shift();

          wheel.eliminatedUsers.push(eliminatedUser);

          wheel.lastEliminationAt = new Date();

          await wheel.save();

          console.log("User eliminated");
        } else {
          const winner = wheel.eliminationOrder[0];

          wheel.winner = winner;

          wheel.status = "COMPLETED";

          wheel.active = false;

          wheel.endAt = new Date();

          await wheel.save();
          await giveWinnerReward(wheel);

          console.log(`Winner declared: ${winner}`);
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const startWorker = () => {
  setInterval(async () => {
    await processWheels();
    await processRunningGames();
  }, 5000);
};

module.exports = {
  processWheels,
  startWorker,
  processRunningGames,
  giveWinnerReward,
  refundPlayers,
};
