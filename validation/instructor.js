const Validator = require("validator")
const isEmpty = require("./is-empty")

module.exports = function validateInstructorProfileInput(data) {
  let errors = {}
  console.log(data)
  // ! isEmpty doesn't work in this use case
  // data.skills = !isEmpty(data.skills) ? data.skills : ""
  // data.phone = !isEmpty(data.phone) ? data.phone : ""

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number is required"
  }

  const skills = [] //new Array(data.skills.length)
  const years = [] //new Array(data.skills.length)
  for (let i = 0; i < data.skills.length; i++) {
    const skill = data.skills[i].skill
    const yearsOfExperience = data.skills[i].yearsOfExperience
    if (Validator.isEmpty(skill)) {
      skills[i] = "Skills field is required"
    }
    if (Validator.isEmpty(yearsOfExperience)) {
      years[i] = "Year of experience field is required"
    }
  }

  if (skills.length !== 0) {
    errors.skills = skills
  }
  if (years.length !== 0) {
    errors.years = years
  }

  // if (!isEmpty(data.website)) {
  //   if (!Validator.isURL(data.website)) {
  //     errors.website = "Not a valid URL"
  //   }
  // }

  // if (!isEmpty(data.youtube)) {
  //   if (!Validator.isURL(data.youtube)) {
  //     errors.youtube = "Not a valid URL"
  //   }
  // }

  // if (!isEmpty(data.twitter)) {
  //   if (!Validator.isURL(data.twitter)) {
  //     errors.twitter = "Not a valid URL"
  //   }
  // }

  // if (!isEmpty(data.facebook)) {
  //   if (!Validator.isURL(data.facebook)) {
  //     errors.facebook = "Not a valid URL"
  //   }
  // }

  // if (!isEmpty(data.linkedin)) {
  //   if (!Validator.isURL(data.linkedin)) {
  //     errors.linkedin = "Not a valid URL"
  //   }
  // }

  // if (!isEmpty(data.instagram)) {
  //   if (!Validator.isURL(data.instagram)) {
  //     errors.instagram = "Not a valid URL"
  //   }
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
