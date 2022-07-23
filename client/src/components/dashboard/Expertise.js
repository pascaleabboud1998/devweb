import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { deleteInstructorProfile } from "../../actions/instructorActions"

class Expertise extends Component {
  static propTypes = {
    deleteInstructorProfile: PropTypes.func.isRequired,
  }

  onDeleteClick = (e, id) => () => {
    // this.props.deleteExperience(id, this.props.history)
  }

  render() {
    const experience = this.props.expertise.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.skill}</td>
        <td>
          <p>{exp.yearsOfExperience}</p>
        </td>
        {/* <td>
          <button
            onClick={this.onDeleteClick(exp._id)}
            className="btn btn-danger"
          >
            Delete Profile
          </button>
        </td> */}
        <td />
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-2">Expertise</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Technology</th>
              <th>Years of Experience</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, { deleteInstructorProfile })(Expertise)
