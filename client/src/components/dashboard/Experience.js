import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
  static propTypes = {
    deleteExperience: PropTypes.func.isRequired,
  }

  onDeleteClick = (e, id) => () => {
    this.props.deleteExperience(id, this.props.history)
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD" date={exp.from} /> -{' '}
          {exp.to === null ? (
            'Present'
          ) : (
            <Moment format="YYYY/MM/DD" date={exp.to} />
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
        <td />
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-2">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience)
