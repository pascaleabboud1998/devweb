import React from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true /*&& auth.user.type === "student" */ ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))
