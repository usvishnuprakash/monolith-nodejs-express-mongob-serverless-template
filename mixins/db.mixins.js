require('dotenv').config({ path: '../.env' });
const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

// NEW CONFIGURATION
// keepAlive: true,
// useNewUrlParser: true,
// useUnifiedTopology: true,
// serverSelectionTimeoutMS: 300000,
// heartbeatFrequencyMS: 10000,
// family: 4,
// dbName: process.env.DB_NAME

const options = {
  // OLD CONFIGURATION
  connectTimeoutMS: 200000,
  socketTimeoutMS: 2000000,
  keepAlive: true,
  useNewUrlParser: true,
  maxPoolSize: 4,
  dbName: process.env.DB_NAME,
};

function connectToDatabase(req, res, next) {
  console.log(
    '----DB----CONNECTION-READYSTATE---------------',
    Mongoose.connection.readyState
  );

  if (Mongoose.connection.readyState === 1) {
    console.log('----DB----PREVIOUS-CONNECTION----------------');

    next();
  } else {
    Mongoose.connect(
      'mongodb+srv://1729:Codewave%401729@cluster0.rshx5.mongodb.net/emint-dev',
      options
    ).then(
      () => {
        console.log('----DB----NEW-CONNECTION-SUCCESS---------------');
        next();
      },
      (err) => {
        console.log('----DB----NEW-CONNECTION-FAILURE----------------');
        console.log(err);
        return res.send({
          status_code: 409,
          success: false,
          message: 'DB connection failure',
        });
      }
    );
  }
}

module.exports = connectToDatabase;
