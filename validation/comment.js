const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.content)) {
    errors.content = "content can't be empty";
  }

  // had to use my own because the built in method always returns the error
  if (data.content.length < 20 || data.content.length > 5000) {
    errors.content = "content has to be 20 to 5000 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
