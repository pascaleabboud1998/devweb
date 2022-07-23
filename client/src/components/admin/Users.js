import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../actions/adminActions";
import Spinner from "../common/Spinner";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.props.getAllUsers();
  }

  deleteUser = id => {
    return () => {
      this.props.deleteUser(id);
    };
  };

  render() {
    if (this.props.admin.loading) {
      return <Spinner />;
    }
    return (
      <div className="container">
        {this.props.admin.users.map(user => (
          <div className="m-2 p-3 border">
            <p>{user.name}</p>
            <p>({user.type})</p>
            <button className="btn btn-danger" onClick={this.deleteUser(user._id)}>
              Delete User
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  getAllUsers,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
