const Wheel = require("../models/wheel.model");
const shuffleArray = require("../utils/shuffle");

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
          wheel.status = "ABORTED";

          wheel.active = false;

          await wheel.save();

          console.log("Wheel aborted");
        } else {
          wheel.status = "RUNNING";
          wheelStartedAt = new Date();

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

          wheel.endTime = new Date();

          await wheel.save();

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
};
