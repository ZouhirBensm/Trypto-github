
let chatController = (io) => {
  
  // CONNECT client calls io()
  io.on("connection", socket =>{
    console.log("new connection")
    
    socket.on("messaging", (inputvalue)=>{
      const msg = inputvalue // renaming
      console.log("Received from client input.value", msg)
      io.emit("broadcast", {
        content: msg
      })
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