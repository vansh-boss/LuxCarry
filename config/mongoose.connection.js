const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌:", err);
  }
}

module.exports = { connectDB };
