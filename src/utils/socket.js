let io;

function init(server) {
  const { Server } = require("socket.io");
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // listen for joinRoom from client
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { init, getIO };
