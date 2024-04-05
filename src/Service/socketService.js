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
            message: `${username} has joined the chat room`,
            __createdtime__,
          });
        })
    })
}