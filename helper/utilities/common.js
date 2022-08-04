const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
  try {
    const rounds = 10;
    const hash = await bcrypt.hash(password, rounds);
    return hash;
  } catch (error) {
    return error;
  }
};

exports.validatePassword = async (password, hash) => {
  try {
    const res = await bcrypt.compare(password, hash);
    return res;
  } catch (error) {
    console.log(error);
  }
};
