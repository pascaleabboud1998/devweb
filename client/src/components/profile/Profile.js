import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileByHandle } from '../../actions/profileActions'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import ProfileHeader from './ProfileHeader'
import Spinner from '../common/Spinner'
class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { handle } = this.props.match.params
    if (handle) {
      this.props.getProfileByHandle(handle, this.props.history)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile.profile === null && !this.props.profile.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  // componentDidUpdate() {
  //   this.props.profile.profile === null &&
  //     !this.props.profile.loading &&
  //     this.props.history.push('/not-found')
  // }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      )
    }
    return profileContent
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  { getProfileByHandle }
)(withRouter(Profile))
