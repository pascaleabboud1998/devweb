import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createProfile, getCurrentProfile } from "../../actions/profileActions"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import SelectListGroup from "../common/SelectListGroup"
import InputGroup from "../common/InputGroup"
import isEmpty from "../../validation/is-empty"
import { Link } from "react-router-dom"

class CreateProfile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      phone: "",
      twitter: "",
      youtube: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      errors: {},
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  // Deprecated in react v17
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      const skillsCSV = profile.skills.join(",")

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : ""
      profile.website = !isEmpty(profile.website) ? profile.website : ""
      profile.location = !isEmpty(profile.location) ? profile.location : ""
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : ""
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ""
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : ""
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : ""
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : ""
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : ""
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : ""

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        phone: profile.phone,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
      })
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      phone: this.state.phone,
    }

    this.props.createProfile(profileData, this.props.history)
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Profile Url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="LinkedIn Profile Url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="Instagram Profile Url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="Youtube Channel Url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      )
    }
    // Select options for status
    const options = [
      {
        label: "* Select Professional status",
        value: "0",
      },
      { label: "Developer", value: "Developer" },
      { value: "Junior Developer", label: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Intern", value: "Intern" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Instructor", value: "Instructor" },
      { label: "Other", value: "Other" },
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile url"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us an idea where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Where do you work"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your own website"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where do you live"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please seperate the skills with a comma"
                />

                <TextFieldGroup
                  placeholder="Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="This will allow the website to fetch your latest repos"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself"
                />

                <TextFieldGroup
                  placeholder="* Phone Number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Your phone number that will be shared with employers"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }))
                    }}
                    className="btn btn-light"
                  >
                    Add social network links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info  btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  // createProfile: PropTypes.func.isRequired,
  // getCurrentProfile: PropTypes.func.isRequired,
})

// No withRouter check PrivateRoute.js
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  CreateProfile
)
