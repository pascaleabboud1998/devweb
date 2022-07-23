import React, { Component } from "react"
import TextFieldGroup from "../common/TextFieldGroup"
import { connect } from "react-redux"
import { createInstructorProfile } from "../../actions/instructorActions"

class CreateInstructorProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: "",
      skills: [{ skill: "", yearsOfExperience: "" }],
      errors: { skills: [], years: [], phone: "" },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  addSkill = (e) => {
    e.preventDefault()
    this.setState({
      skills: [...this.state.skills, { skill: "", yearsOfExperience: "" }],
    })
  }

  deleteSkill = (index, e) => {
    e.preventDefault()
    console.log("Deleting index ", index)
    if (index === 0) return
    const skills = this.state.skills
    skills.splice(index, 1)
    this.setState({ skills: [...skills] })
  }

  onChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeyearsOfExperience = (e) => {
    // * maybe make this into a function
    const index = e.target.dataset.index
    const newSkill = this.state.skills[index]
    newSkill.yearsOfExperience = e.target.value
    const skills = this.state.skills
    skills[index] = newSkill
    this.setState({ skills: [...skills] })
  }

  onChangeSkill = (e) => {
    const index = e.target.dataset.index
    const newSkill = this.state.skills[index]
    newSkill.skill = e.target.value
    const skills = this.state.skills
    skills[index] = newSkill
    this.setState({ skills: [...skills] })
  }

  onSubmit = (e) => {
    e.preventDefault()
    // get the data
    const { skills, phone } = this.state
    const data = { skills, phone }
    // call the api through the redux-action
    this.props.createInstructorProfile(data, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Phone Number"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
                error={errors.phone}
                info="Your phone number that will be shared with students"
              />
              <h2 className="mb-4">Add your skills and years of experience</h2>
              {this.state.skills.map((skill, index) => {
                return (
                  <div key={index}>
                    <div className="row mb-3">
                      <div className="col-6">
                        <h4>Skill #{index}</h4>
                      </div>
                      <div className="col-6 ">
                        {index != 0 && (
                          <button
                            className="btn btn-danger d-block ml-auto"
                            onClick={(e) => this.deleteSkill(index, e)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    <TextFieldGroup
                      placeholder={`Skill #${index}`}
                      name="skills"
                      index={index}
                      value={this.state.skills[index].skill}
                      onChange={this.onChangeSkill}
                      error={errors.skills[index]}
                      info="Your skill"
                    />
                    <TextFieldGroup
                      placeholder={`Years of Experience #${index}`}
                      name="skills"
                      index={index}
                      value={this.state.skills[index].yearsOfExperience}
                      onChange={this.onChangeyearsOfExperience}
                      error={errors.years[index]}
                      type="number"
                      info="Your years of experience in that skill"
                    />
                  </div>
                )
              })}

              <div className="">
                <button
                  onClick={this.addSkill}
                  className="btn btn-large btn-primary d-block ml-auto my-3"
                >
                  Add another skill
                </button>
              </div>
              {/* ! useful for later */}
              {/* <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please seperate the skills with a comma"
              /> */}

              {/* <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us about yourself"
              /> */}

              <input
                type="submit"
                value="Submit"
                className="btn btn-info  btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  instructor: state.instructor,
  errors: state.errors,
})

export default connect(mapStateToProps, { createInstructorProfile })(
  CreateInstructorProfile
)
