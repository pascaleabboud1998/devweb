import React, { Component } from "react"
import "./App.css"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { clearCurrentProfile } from "./actions/profileActions"
// Custom Components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Landing from "./components/layout/Landing"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Profiles from "./components/profiles/Profiles"
import Dashboard from "./components/dashboard/Dashboard"
import CreateProfile from "./components/create-profile/CreateProfile"
import EditProfile from "./components/edit-profile/EditProfile"
import AddExperience from "./components/add-credentials/AddExperience"
import AddEducation from "./components/add-credentials/AddEducation"
import Profile from "./components/profile/Profile"
import Ads from "./components/ads/Ads"
import MyAds from "./components/ads/MyAds"
import CreateAd from "./components/ads/CreateAd"
import MyApplications from "./components/ads/MyApplications"
import Users from "./components/admin/Users"
import Comments from "./components/instructor/Comments"
import SearchInstructor from "./components/instructor/SearchInstructor"
// Redux
import { Provider } from "react-redux"
// Redux store
import store from "./store"

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/common/PrivateRoute"
import NotFound from "./components/not-found/NotFound"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"
import EmployerRoute from "./components/common/EmployerRoute"
import AdminRoute from "./components/common/AdminRoute"
import InstructorRoute from "./components/common/InstructorRoute"
import EmployerStudentRoute from "./components/common/EmployerStudentRoute"
import CreateInstructorProfile from "./components/instructor/CreateInstructorProfile"
import EditInstructorProfile from "./components/instructor/EditInstructorProfile"
import Applications from "./components/ads/Applications"

// Check for token
if (localStorage.jwtToken) {
  // set auth token header
  setAuthToken(localStorage.jwtToken)
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthentication
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    console.log("Expired token")
    store.dispatch(logoutUser())
    // Clear current profile
    // TODO
    // Redirect to login
    store.dispatch(clearCurrentProfile())
    window.location.href = "/login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <EmployerRoute exact path="/myads" component={MyAds} />
              <PrivateRoute exact path="/learn" component={SearchInstructor} />
              <PrivateRoute
                exact
                path="/myapplications"
                component={MyApplications}
              />
              <EmployerStudentRoute exact path="/ads" component={Ads} />
              <EmployerRoute exact path="/create-ad" component={CreateAd} />
              <EmployerRoute
                exact
                path="/applications/:id"
                component={Applications}
              />
              <InstructorRoute
                exact
                path="/create-instructor-profile"
                component={CreateInstructorProfile}
              />
              <InstructorRoute
                exact
                path="/edit-instructor-profile"
                component={EditInstructorProfile}
              />
              <AdminRoute exact path="/admin/users" component={Users} />
              <Route exact path="/:handle/comments" component={Comments} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
