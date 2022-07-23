import React, { Component } from "react";
import classnames from "classnames";

class Select extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.onChange}
          className={classnames("form-control form-control-lg", {
            "is-invalid": this.props.error,
          })}>
          {this.props.options.map(array => (
            <option value={array[0]}>{array[1]}</option>
          ))}
        </select>
        {this.props.error && <div className="invalid-feedback">{this.props.error}</div>}
      </div>
    );
  }
}

export default Select;
