const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const wheelRoutes = require("./routes/wheel.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Spin wheel Backend Running");
});

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/wheel", wheelRoutes);

module.exports = app;