
// Setup our Express Server localhost:3000 to a socket server as well
const { createServer } = require("http");
const { Server } = require("socket.io")
const chatControllers = require("../controllers/messenger-controllers/messenger-controllers")
const {express_server_app_router, sessionMiddleware} = require("./server")

// Create a server instance from our existing express server
const server_instance = createServer(express_server_app_router);
// Making a socket server from the instance
const io = new Server(server_instance);



// converts a express sessionMiddleware middleware to a Socket.IO middleware
const wrap = function(middleware) { 
  // console.log("socket.request: ", socket.request); 
  return (socket, next) => {middleware(socket.request, {}, next)}
};

// use the socket sessions middleware
io.use(wrap(sessionMiddleware));

// only allow authenticated users
io.use((socket, next) => {
  // console.log("Session from socket thanks to socket session middleware i.e. socket.request.session: ", socket.request.session);
  const session = socket.request.session;
  // If logged in, in socket session, proceed else unauthorized!
  if (session && session.userId) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

// Controller adds events to the socket server on localhost:3000
chatControllers(io)

module.exports = server_instance