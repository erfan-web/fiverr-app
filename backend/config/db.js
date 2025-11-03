// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!mongoose.connection.readyState);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connection successfully`);
  } catch (error) {
    console.error(`MongoDB connection failed Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
