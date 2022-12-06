var ObjectId = require('mongodb').ObjectId; 
const ENV = require('../../../config/base')
const { MongoClient } = require('mongodb');
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function disconnect_evt(socket){

  // ______________________________________________________________________
  // DISCONNECT client page reloads or exits (because io() looses the connection?)
  socket.on("disconnect", async () => {
    console.log("\n\n\n\n\n____'disconnect' EVENT____\n\n\n\n\n")

    // Re-query the sessions
    try {
      await mongodbClient.connect();
      sessionCollection = mongodbClient.db(ENV.database_name).collection("sessions")
      all_sessions = sessionCollection.find()
      sessions = await all_sessions.toArray()

      console.log("\n\nSessions collection:\n\n", sessions)
      
      // Identify my session and de-append the entire socket field as user exits
      let mongo_update_ret_obj = await sessionCollection.updateOne({"session.userId": ObjectId(socket.request.session.userId)}, {$unset: {"session.socket":1}}, { upsert: false, new: true });
      
      console.log("\nPromise return resolved value for de-appending the socket:\n", mongo_update_ret_obj)

    } catch (e) {
      console.error(e);
    } finally {
      // Close client
      await mongodbClient.close();
    }
  });

}

module.exports = disconnect_evt