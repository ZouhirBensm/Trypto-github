// This script can be deleted after execution. I freshly added the lang field to the database collection Schema named Article. This script adds the field «lang: 'en'» to all old documents in the collection. This script can be ran in dev and in prod.


// TODO !!!! give the capacity to set the language on the create article operations front to back end processes. Lang en is set by default, upon article creation


const mongoose = require('mongoose')
// var fs = require("fs");
require('dotenv').config();




const Article = require('../../models/articles-models/Article');

const ENV = require('../../config/base');

console.log(ENV)



mongoose.set('strictQuery', true);





(async () => {
  try {
    await mongoose.connect(ENV.database_link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database');

    await Article.updateMany({}, { $set: { lang: 'en' } });
    console.log('All documents updated successfully');

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
})();