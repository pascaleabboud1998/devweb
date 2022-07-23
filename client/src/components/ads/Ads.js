import React, { Component } from "react"
import { connect } from "react-redux"
import {
  getAllAds,
  applyToJob,
  getUserJobApplications,
} from "../../actions/adActions"
import Spinner from "../common/Spinner"

export class Ads extends Component {
  constructor(props) {
    super(props)
    this.props.getAllAds()
    this.props.getUserJobApplications()
  }

  sendApplication = async (jobId, userId) => {
    // ? call the action (APPLY_TO_JOB)
    this.props.applyToJob(jobId, userId)
  }

  render() {
    if (this.props.ads.loading) {
      return <Spinner />
    } else {
      return (
        <div className="container">
          {this.props.errors.error && (
            <p className="m-auto text-danger text-center alert alert-danger">
              {this.props.errors.error}
            </p>
          )}
          {this.props.ads.ads.length == 0 ? (
            <h1>There are no job postings</h1>
          ) : (
            this.props.ads.ads.map((ad, index) => (
              <div className="m-5" key={index}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <p>Posted by: {ad.user.name}</p>
                <p className="text-grey">
                  Salary: {ad.salary ? ad.salary : "N/A"}
                </p>
                {this.props.ads.appliedAds.indexOf(ad._id) != -1 ? (
                  "Applied"
                ) : (
                  <button
                    className="btn btn-lg btn-secondary"
                    onClick={() =>
                      this.sendApplication(ad._id, this.props.auth.user.id)
                    }
                  >
                    Apply
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  ads: state.ads,
  auth: state.auth,
  errors: state.errors,
})

const mapDispatchToProps = {
  getAllAds,
  applyToJob,
  getUserJobApplications,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ads)
