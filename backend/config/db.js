const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `Mongo DB Connected ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
