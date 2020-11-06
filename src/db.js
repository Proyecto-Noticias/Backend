///// START CODE REVIEW COMMENT

// Perfect!

///// END CODE REVIEW COMMENT

const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    const db = await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log("Database Connected", db.connection.host);
  } catch (error) {
    console.error(error);
  }
})();
