import React, { Component } from "react";
import PropTypes from "prop-types";
// Custom Components
import TextFieldGroup from "../common/TextFieldGroup";
// Routing
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import Select from "../common/Select";

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      type: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      type: this.state.type,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  value={this.state.name}
                  error={errors.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />

                <TextFieldGroup
                  name="email"
                  value={this.state.email}
                  error={errors.email}
                  onChange={this.onChange}
                  placeholder="Email"
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />

                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  error={errors.password}
                  onChange={this.onChange}
                  placeholder="Password"
                />

                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  error={errors.password2}
                  onChange={this.onChange}
                  placeholder="Password"
                />

                <Select
                  name="type"
                  id="type"
                  onChange={this.onChange}
                  error={errors.type}
                  options={[
                    ["none", "Choose"],
                    ["student", "Student"],
                    ["instructor", "Instructor"],
                    ["employer", "Employer"],
                  ]}
                  label="I'm signing up as a(n): "
                />

                {/* <div className="form-group">
                  <label htmlFor="type">I'm signing up as a(n): </label>
                  <select
                    name="type"
                    id="type"
                    onChange={this.onChange}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.type,
                    })}>
                    <option value="none">Choose</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="employer">Employer</option>
                  </select>
                  <div className="invalid-feedback">{errors.type}</div>
                </div> */}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
