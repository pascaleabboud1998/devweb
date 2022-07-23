require("dotenv").config() // get you env variables
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")
// API routes
const users = require("./routes/api/users")
const profile = require("./routes/api/profile")
const posts = require("./routes/api/posts")
const ads = require("./routes/api/ads")
const admin = require("./routes/api/admin")
const comment = require("./routes/api/comments")
const instructor = require("./routes/api/instructor")

const app = express()

//middleware
const isAuthenticated = require("./config/passport")

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DB URI
const { mongoURI } = require("./config/keys")
// Connect to mongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err))

// Passport Middleware
// app.use(passport.initialize());

// Passport Config
// require("./config/passport.js")(passport);

//Use routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)
app.use("/api/ads", ads)
app.use("/api/admin", admin)
app.use("/api/comment/", comment)
app.use("/api/instructor", instructor)

// For heroku
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("production mode")
  app.use(express.static("client/build"))
  // console.log(path.resolve(__dirname, "client/", "build/", "index.html"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/", "build/", "index.html"))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
