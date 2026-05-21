const Wheel = require(
  "../models/wheel.model"
);

const processWheels = async () => {

  try {

    const wheels =
      await Wheel.find({
        active: true,
        status: "WAITING",
      });

    for (const wheel of wheels) {

      const now = new Date();

      if (now >= wheel.startTime) {

        if (
          wheel.participants.length < 3
        ) {

          wheel.status = "ABORTED";

          wheel.active = false;

          await wheel.save();

          console.log(
            "Wheel aborted"
          );

        } else {

          wheel.status = "RUNNING";

          await wheel.save();

          console.log(
            "Wheel started"
          );
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

  }, 5000);
};

module.exports = {
  startWorker,
};