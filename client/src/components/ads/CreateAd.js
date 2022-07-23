import React, { Component } from "react";
import { connect } from "react-redux";
import { addAd } from "../../actions/adActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

export class CreateAd extends Component {
  state = {
    title: "",
    description: "",
    salary: 0,
    // errors: {},
    success: false,
  };

  createAd = e => {
    e.preventDefault();
    const { title, description, salary } = this.state;
    this.props.addAd({ title, description, salary });
    this.setState({ success: true });
    setTimeout(this.hide, 3000);
  };

  hide = () => {
    this.setState({ success: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.createAd}>
          <TextFieldGroup
            label="Title"
            required={true}
            placeholder="title"
            value={this.state.title}
            onChange={this.onChange}
            name="title"
            type="text"
            error={this.props.errors.title}
          />

          <TextAreaFieldGroup
            placeholder="Description"
            required={true}
            label="Description"
            value={this.state.description}
            info="Please provide contact information so that people can contact you."
            onChange={this.onChange}
            name="description"
            error={this.props.errors.description}
          />

          <TextFieldGroup
            label="Salary"
            placeholder="salary"
            value={this.state.salary}
            onChange={this.onChange}
            name="salary"
            type="number"
            // error={this..errors.salary}
          />
          <input type="submit" value="Create Ad" className="m-1" />
          {this.state.success && <div className="alert alert-success">Added Advertisement</div>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ errors: state.errors });

const mapDispatchToProps = { addAd };

export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);
