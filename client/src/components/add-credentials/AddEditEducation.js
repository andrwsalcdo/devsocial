import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addEducation,
  getCurrentProfile,
  editEducation
} from "../../redux/actions/profileActions";
import { updateEduForm } from "../../utils/updateFormState";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddEditEducation extends Component {
  static propTypes = {
    addEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    editEducation: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.errors !== nextProps.errors) {
      return { errors: nextProps.errors };
    }
    const editEduRoute = nextProps.match.path !== "/add-education";
    const { profile } = nextProps.profile;
    if (editEduRoute && profile !== null && prevState.school === "") {
      const { education } = profile;
      const { _id } = nextProps.match.params;
      return updateEduForm(education, _id);
    }
    return null;
  };

  componentDidMount() {
    const editEduRoute = this.props.match.path !== "/add-education";
    if (editEduRoute) {
      this.props.getCurrentProfile();
    }
  }

  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  onSubmit = e => {
    e.preventDefault();

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    if (this.props.match.path !== "/add-education") {
      const { _id } = this.props.match.params;
      // call redux action
      this.props.editEducation(educationData, _id, this.props.history);
    } else {
      // call redux action
      this.props.addEducation(educationData, this.props.history);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = () => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }));
  };

  render() {
    const {
      errors,
      disabled,
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      // hack: this displays only when user is editing.
      // i.e. when route => /:edu.id
      // never displays on /add-education route.
      // having problems with moment, so this little hack
      // helps users with the dates
      originalFrom,
      originalTo
    } = this.state;
    const { match } = this.props;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              {match.path === "/add-education" && (
                <React.Fragment>
                  <h1 className="display-4 text-center">Add Education</h1>
                  <p className="lead text-center">
                    Add any school, bootcamp, etc that you have attended
                  </p>
                </React.Fragment>
              )}
              {!(match.path === "/add-education") && (
                <React.Fragment>
                  <h1 className="display-4 text-center">Edit Education</h1>
                </React.Fragment>
              )}
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                {!(match.path === "/add-education") && <h6>School</h6>}
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                {!(match.path === "/add-education") && <h6>Degree</h6>}
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                {!(match.path === "/add-education") && <h6>Field of Study</h6>}
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                  smallInfo={originalFrom}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? "disabled" : ""}
                  smallInfo={originalTo}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Education Program
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  smallInfo="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {
  addEducation,
  getCurrentProfile,
  editEducation
})(withRouter(AddEditEducation));
