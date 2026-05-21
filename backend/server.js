require("dotenv").config();

const http = require("http");

const app = require("./src/app");
const {startWorker} = require("./src/jobs/wheel.job");
const {
  initializeSocket,
} = require("./src/socket");

const connectDB =
  require("./src/database/db");
const { start } = require("repl");

const port =
  process.env.PORT || 5000;

const startServer =
  async () => {

    try {

      await connectDB();

      const server =
        http.createServer(app);

      initializeSocket(server);

      server.listen(port, () => {
        console.log(
          `Server running on port ${port}`
        );
        startWorker();
      });

    } catch (error) {

      console.log(error);
    }
};

startServer();