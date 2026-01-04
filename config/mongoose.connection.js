const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const conn = await mongoose.connect(
    `${process.env.MONGODB_URI}`
  );

  isConnected = conn.connections[0].readyState;
  console.log("MongoDB connected");
}

module.exports = { connectDB };
