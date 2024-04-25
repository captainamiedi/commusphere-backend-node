export default (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected ${socket.id}`);
        // Add organization to a room
        socket.on('join_room', (data) => {
          const {userName, room} = data
          socket.join(room)
      
          let __createdtime__ = Date.now(); // Current timestamp
          // Send message to all users currently in the room, apart from the user that just joined
          socket.to(room).emit('receive_message', {
            message: `${userName} has joined the chat room`,
            __createdtime__,
          });
        })
        socket.emit('testing', 1, "2", { 3: "4", 5: Buffer.from([6]) })
        socket.emit('receive_message', {
          message: "testing receive_message lister",
          __createdtime__:  Date.now()
        })
    })
}