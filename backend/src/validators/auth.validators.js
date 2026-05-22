const validator = require("validator");

const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (password.length < 6) {
    throw new Error("Password too short");
  }
};

module.exports = {
  validateRegister,
};
