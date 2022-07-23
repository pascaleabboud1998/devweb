import React, { Component } from "react"
import { connect } from "react-redux"
import { getJobApplications } from "../../actions/adActions"
import Spinner from "../common/Spinner"
import { Link } from "react-router-dom"

export class Applications extends Component {
  constructor(props) {
    super(props)
    this.props.getJobApplications(this.props.match.params.id)
  }

  // UNSAFE_componentWillMount() {}

  render() {
    return (
      <>
        {this.props.ads.loading ? (
          <Spinner />
        ) : (
          <div className="container">
            {this.props.ads.appliedUsers.length == 0 ? (
              <h1>No one has applied yet</h1>
            ) : (
              this.props.ads.appliedUsers.map((user, index) => (
                <div className="card" key={user.id}>
                  <div className="m-1 card-body">
                    <h3>{user.name}</h3>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    <Link to={`/profile/${user.handle}`}>View Profile</Link>
                  </div>
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

const mapDispatchToProps = { getJobApplications }

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
