
let chatController = (io) => {
  
  // CONNECT client calls io()
  io.on("connection", socket =>{
    console.log("new connection")
    
    socket.on("messaging", (userSendObjectPackaged)=>{

      console.log("Received from client input.value", userSendObjectPackaged)
      io.emit("broadcast", userSendObjectPackaged)
    })
    
    // DISCONNECT client page reloads or exits (because io() looses the connection?)
    socket.on("disconnect", () => {
      console.log('user disconnected');
    });
  })
}

module.exports = {
  chatController: chatController,
}