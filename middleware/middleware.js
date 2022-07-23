function isAdmin(req, res, next) {
  if (req.user.type === "admin") {
    next(null, true)
  } else {
    res.status(401).json({ msg: "User is not an admin" })
  }
}

function isEmployer(req, res, next) {
  if (req.user.type === "employer") {
    next()
  } else {
    res.status(401).json({ msg: "User is not an employer" })
  }
}

function isInstructor(req, res, next) {
  if (req.user.type === "instructor") {
    next()
  } else {
    res.status(401).json({ msg: "User is not an instructor" })
  }
}

function isStudent(req, res, next) {
  if (req.user.type === "student") {
    next()
  } else {
    res.status(401).json({ msg: "User is not a student" })
  }
}

function isStudentOrEmployer(req, res, next) {
  if (req.user.type === "student" || req.user.type === "employer") {
    next()
  } else {
    res.status(401).json({ msg: "User is neither a student nor an employer" })
  }
}

module.exports = {
  isAdmin,
  isInstructor,
  isEmployer,
  isStudent,
  isStudentOrEmployer,
}
