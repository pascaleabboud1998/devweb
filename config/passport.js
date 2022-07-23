const { Strategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const keys = require("../config/keys");
const bcrypt = require("bcryptjs");
const config = require("../config/keys");
const jwt = require("jsonwebtoken");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

// module.exports = passport => {
//   passport.use(
//     new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
//       try {
//         const user = await User.find({ email: email });
//         if (!user) {
//           return done(null, false, { message: "Invalid Credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Invalid Credentials" });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );
// };
