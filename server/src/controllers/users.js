const { User } = require("../db");
const bcrypt = require("bcrypt");
  
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    if (!allUsers.length) {
      throw new Error("No users available");
    }
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers
}; 