const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL
class ConnectionController{
  static conn(){
    mongoose.connect(DATABASE_URL,{dbName:"sandyc"})
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to the MongoDB database');
  });
  }
}
module.exports=ConnectionController