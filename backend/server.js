require("dotenv").config();

// console.log(process.env.MONGO_URI);

const http = require("http");
const app = require("./src/app");

const connectDB = require("./src/database/db");

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();