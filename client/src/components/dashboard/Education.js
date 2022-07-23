import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  static propTypes = {
    deleteEducation: PropTypes.func.isRequired,
  }

  onDeleteClick = (e, id) => () => {
    this.props.deleteEducation(id, this.props.history)
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD" date={edu.from} /> -{' '}
          {edu.to === null ? (
            'Present'
          ) : (
            <Moment format="YYYY/MM/DD" date={edu.to} />
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick(edu._id)}
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
        <h4 className="mb-2">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  null,
  { deleteEducation }
)(Education)
