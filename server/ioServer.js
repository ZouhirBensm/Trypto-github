
const { createServer } = require("http");
const { Server } = require("socket.io")
const messengerControllers = require("../controllers/messenger-controllers/messenger-controllers")
const {express_server_app_router, sessionMiddleware} = require("./server")

// console.log(express_server_app_router)
// IO
const server_instance = createServer(express_server_app_router);
const io = new Server(server_instance);



// convert a connect middleware to a Socket.IO middleware
const wrap = function(middleware) { 
  // console.log("socket.request: ", socket.request); 
  return (socket, next) => {middleware(socket.request, {}, next)}
};

io.use(wrap(sessionMiddleware));

// only allow authenticated users
io.use((socket, next) => {
  // console.log("SESSSSSSSSS: ", socket.request.session);
  const session = socket.request.session;
  // console.log(session.authenticated)
  if (session && session.userId) {
    // console.log("a223")
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

messengerControllers.chatControllers(io)

module.exports = server_instance