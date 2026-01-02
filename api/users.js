const dbConnect = require("../config/mongoose.connection");
const User = require("../model/user.model");

module.exports = async function handler(req, res) {
  await dbConnect(); // serverless safe
  const users = await User.find({});
  res.status(200).json(users);
};
