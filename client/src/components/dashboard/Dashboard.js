import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import {
  getInstructorProfile,
  deleteInstructorAccount,
  deleteInstructorProfile,
} from "../../actions/instructorActions"
import Spinner from "../common/Spinner"
import { Link } from "react-router-dom"
import ProfileActions from "./ProfileActions"
import Experience from "./Experience"
import Expertise from "./Expertise"
import Education from "./Education"

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.auth.user.type === "student") {
      this.props.getCurrentProfile()
    } else if (this.props.auth.user.type === "instructor") {
      this.props.getInstructorProfile()
    } else {
      console.log("nothing requested")
    }
  }

  onDeleteClick = (e) => {
    if (this.props.auth.user.type === "student") {
      this.props.deleteAccount()
    } else if (this.props.auth.user.type === "instructor") {
      this.props.deleteInstructorAccount()
    }
  }

  onDeleteProfileClick = async (e) => {
    if (this.props.auth.user.type === "instructor") {
      await this.props.deleteInstructorProfile()
    }
    window.location.reload()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    const { profile: instructorProfile, loading: instructorLoading } =
      this.props.instructor
    // const { {profile: { profile, loading } }, {auth: { user } } } = this.props
    let dashboardContent = ""

    if (user.type == "instructor") {
      if (instructorProfile === null || instructorLoading) {
        dashboardContent = <Spinner />
      } else {
        dashboardContent = (
          <div>
            <p>{user.type}</p>
            <p>Welcome {user.name}!</p>
            <p className="info">
              As an instructor you can comment on student profiles
            </p>
            {Object.keys(instructorProfile).length > 0 ? (
              <>
                <Expertise expertise={instructorProfile.skills} />
                <Link
                  to="edit-instructor-profile"
                  className="btn btn-secondary mr-3"
                >
                  Edit Profile
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={this.onDeleteProfileClick}
                >
                  Delete Profile
                </button>
              </>
            ) : (
              <Link
                to="/create-instructor-profile"
                className="btn btn-lg btn-info"
              >
                Create Profile
              </Link>
            )}
            <h5 className="mt-5 pb-0 mb-0">Delete your Account</h5>
            <small className="info text-muted mb-2">
              This action can't be undone
            </small>
            <hr />
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
              Delete Account
            </button>
          </div>
        )
      }
    } else if (user.type == "student") {
      if (profile === null || loading) {
        dashboardContent = <Spinner />
      } else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              <ProfileActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div style={{ marginBottom: "60px" }}>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete Account
                </button>
              </div>
            </div>
          )
        } else {
          // User has no profile
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>You have not setup a profile</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          )
        }
      }
    } else if (user.type == "employer") {
      dashboardContent = (
        <div>
          <p>
            Welcome {user.name}! ({user.type})
          </p>
          <Link to="/create-ad" className="m-1 text-white btn btn-info">
            Create Ad
          </Link>
          <Link to="/myads" className="btn btn-info m-1">
            My Ads
          </Link>
        </div>
      )
    } else if (user.type == "admin") {
      dashboardContent = (
        <div>
          <p>
            Welcome {user.name}! ({user.type})
          </p>
          <Link to="/admin/users" className="m-1 btn btn-info">
            Manage users
          </Link>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  instructor: state.instructor,
})

// No withRouter check PrivateRoute.js
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getInstructorProfile,
  deleteInstructorProfile,
})(Dashboard)
