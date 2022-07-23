import React, { Component } from "react"
import { connect } from "react-redux"
import { getAppliedJobs } from "../../actions/adActions"
import Spinner from "../common/Spinner"

export class MyApplications extends Component {
  constructor(props) {
    super(props)
    this.props.getAppliedJobs()
  }

  // UNSAFE_componentWillMount() {}

  render() {
    return (
      <>
        {this.props.ads.loading ? (
          <Spinner />
        ) : (
          <div className="container">
            {this.props.ads.userApplications.length == 0 ? (
              <h1>You haven't submitted any applications</h1>
            ) : (
              this.props.ads.userApplications.map((ad, index) => (
                <div className="m-5" key={index}>
                  <h3>{ad.offering.title}</h3>
                  <p>{ad.offering.description}</p>
                  <p className="text-grey">
                    Salary: {ad.offering.salary ? ad.offering.salary : "N/A"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ads: state.ads,
})

const mapDispatchToProps = { getAppliedJobs }

export default connect(mapStateToProps, mapDispatchToProps)(MyApplications)
