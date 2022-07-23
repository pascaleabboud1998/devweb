import React, { Component } from "react"
// import second from "first"
import TextFieldGroup from "../common/TextFieldGroup"
import axios from "axios"

class SearchInstructor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instructors: [],
      search: "",
    }
  }
  onSubmit = async (e) => {
    e.preventDefault()
    const { search } = this.state
    const skills = search.split(",").map((x) => x.trim())
    // ? Call API and store result
    try {
      const result = await axios.post("/api/instructor/search", { skills })
      const instructorList = await result.data
      console.log(instructorList)
      this.setState({ instructors: instructorList })
    } catch (e) {
      console.log(e)
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { search, instructors } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-8 m-auto">
            <form onSubmit={this.onSubmit} className="w-100">
              <TextFieldGroup
                type="search"
                label="Search for a skill"
                placeholder="Enter a skill you want to learn"
                info="This will search for instructors that can teach that skill"
                onChange={this.onChange}
                name="search"
                value={search}
              />
              <input type="submit" value="Search" className="btn btn-info" />
            </form>
          </div>
        </div>
        {instructors.length > 0 && (
          <div className="row mt-4">
            <div className="card w-50 m-auto">
              {instructors.map((instructor) => (
                <div className="card-body">
                  <div className="col-10 m-auto" key={instructor._id}>
                    <p>
                      <b> Name:</b> {instructor.user.name}
                    </p>
                    <p>
                      <b>Phone Number:</b> {instructor.phone}
                    </p>
                    <p>
                      <b>Skills list</b>
                    </p>
                    <ul>
                      {instructor.skills.map((skill) => (
                        <li>
                          {skill.skill}, <i>Years of Experience:</i>{" "}
                          {skill.yearsOfExperience} year
                          {skill.yearsOfExperience > 1 ? "s" : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SearchInstructor
