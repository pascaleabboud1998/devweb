import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserComments, addComment, deleteComment } from "../../actions/commentActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Spinner from "../common/Spinner";

export class Comments extends Component {
  state = {
    content: "",
    handle: "",
  };

  componentDidMount() {
    const { handle } = this.props.match.params;
    this.setState({ handle });
    this.props.getUserComments(handle);
  }

  componentDidUpdate() {
    console.log("updated");
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addComment = e => {
    e.preventDefault();
    console.log(this.state.content.length);
    this.props.addComment(this.state);
  };

  deleteComment = id => {
    return () => {
      this.props.deleteComment(id);
    };
  };

  render() {
    return (
      <div className="container">
        {this.props.auth.user.type === "instructor" ? (
          <form onSubmit={this.addComment}>
            <TextAreaFieldGroup
              name="content"
              placeholder="write your message here"
              value={this.state.content}
              label="Comment"
              onChange={this.onChange}
              error={this.props.errors.content}
              required={true}
              info={"minimum 20 character up to 5000"}
            />
            <button className="btn btn-primary" onClick={this.addComment}>
              Add Comment
            </button>
          </form>
        ) : null}
        {!this.props.comments.loading &&
          this.props.comments.comments.map((comment, index) => (
            <div key={index} className="card m-2" style={{ borderStyle: "solid", borderWidth: 1 }}>
              <div className="card-body">
                <p>
                  <img
                    src={comment.from.avatar}
                    alt=""
                    style={{ width: 64, height: 64, borderRadius: "50%" }}
                  />{" "}
                  {comment.from.name}
                </p>

                <p>{comment.content}</p>
                {this.props.auth.user.id == comment.from._id ? (
                  <button className="btn btn-danger" onClick={this.deleteComment(comment._id)}>
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        {this.props.comments.loading ? <Spinner /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = {
  getUserComments,
  addComment,
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
