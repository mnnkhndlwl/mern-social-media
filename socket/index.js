const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000", // our react aplication url
    },
  });

  let users = []; //we are gonna change this

  io.on("connection", (socket) => {
    console.log("user connected");

    //after every connection take userId and socketId from user
  });