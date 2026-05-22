const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const wheelRoutes = require("./routes/wheel.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Spin wheel Backend Running");
});
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/wheel", wheelRoutes);
app.use(errorMiddleware);


module.exports = app;
