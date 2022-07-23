import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getUserAds, deleteAd } from "../../actions/adActions"
import Spinner from "../common/Spinner"

export class MyAds extends Component {
  constructor(props) {
    super(props)
    this.props.getUserAds()
  }

  delete = (id) => {
    return () => {
      this.props.deleteAd(id)
    }
  }

  render() {
    if (this.props.ads.loading) {
      return <Spinner />
    } else {
      return (
        <div className="container">
          {this.props.ads.ads.length == 0 ? (
            <h1>You haven't created any ads</h1>
          ) : (
            this.props.ads.ads.map((ad, index) => (
              <div className="m-5" key={index}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <p className="text-grey">
                  Salary: {ad.salary ? ad.salary : "N/A"}
                </p>
                <button
                  onClick={this.delete(ad._id)}
                  className="btn btn-danger"
                >
                  Delete Ad
                </button>
                <Link
                  className="btn btn-success ml-3"
                  to={`/applications/${ad._id}`}
                >
                  View Applications
                </Link>
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
})

const mapDispatchToProps = { getUserAds, deleteAd }

export default connect(mapStateToProps, mapDispatchToProps)(MyAds)
