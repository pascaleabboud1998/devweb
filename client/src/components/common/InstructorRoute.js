import React from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const InstructorRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true && auth.user.type == "instructor" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

InstructorRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default withRouter(connect(mapStateToProps)(InstructorRoute))
