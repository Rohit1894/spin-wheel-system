let io;

const initializeSocket = (server) => {
  const socketIO = require("socket.io");

  io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-wheel-room", (wheelId) => {
      socket.join(wheelId);

      console.log("Joined room:", wheelId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const getIO = () => {
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
