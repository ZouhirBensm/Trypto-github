
let chatController = (io) => {
  
  // CONNECT client calls io()
  io.on("connection", socket =>{
    // socket zouhir 
    // query la base donne pr si ya deja communication
    // 1. recents messages 
    // emit les msgs
    // 2. entry user zouhir, user riadh
    // message enregistre 
    // sender, receiver, message, id, datetime
    
    console.log(`\n\n_______new connection_______:\nSocketID: ${socket.id}\n\n`)
    
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