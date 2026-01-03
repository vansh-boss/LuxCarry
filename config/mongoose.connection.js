const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(`${MONGODB_URI}/BAGG`);
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

connectDB();

module.exports = mongoose.connection;
