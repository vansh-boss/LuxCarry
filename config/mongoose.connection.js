const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const conn = await mongoose.connect(`${MONGODB_URI}/BAGG`);
  isConnected = conn.connections[0].readyState;
  console.log("MongoDB connected");
}

module.exports = connectDB;
