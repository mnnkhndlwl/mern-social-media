const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000", // our react aplication url
    },
  });

  let users = []; //we are gonna change this

  const addUser = (userId,socketId) => { // if user is unique
    //The some() method tests whether at least one element in the array passes the test implemented by the provided function. 
    //It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns 
    //false. It doesn't modify the array.
    !users.some((user) => user.userId === userId) //for each user inside
    && 
    users.push({ userId, socketId });
};

const removeUser = (socketId) => { 
    //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    console.log("user connected");

    //after every connection take userId and socketId from user
    socket.on("addUser", (userId) => { //will add this user in our users array
        addUser(userId,socket.id);
        io.emit("getUsers", users); //sending users to our client
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });
    

    //when disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});