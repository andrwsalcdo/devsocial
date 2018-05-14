import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addExperience,
  getCurrentProfile,
  editExperience
} from "../../redux/actions/profileActions";
import { updateExpForm } from "../../utils/updateFormState";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddEditExperience extends Component {
  static propTypes = {
    addExperience: PropTypes.func.isRequired,
    editExperience: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.errors !== nextProps.errors) {
      return { errors: nextProps.errors };
    }
    const editExpRoute = nextProps.match.path !== "/add-experience";
    const { profile } = nextProps.profile;
    if (editExpRoute && profile !== null && prevState.company === "") {
      const { experience } = profile;
      const { _id } = nextProps.match.params;
      return updateExpForm(experience, _id);
    }
    return null;
  };

  componentDidMount() {
    const editExpRoute = this.props.match.path !== "/add-experience";
    if (editExpRoute) {
      this.props.getCurrentProfile();
    }
  }

  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  onSubmit = e => {
    e.preventDefault();

    const experienceData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    if (this.props.history.location.pathname !== "/add-experience") {
      const { _id } = this.props.match.params;
      // call redux action
      this.props.editExperience(experienceData, _id, this.props.history);
    } else {
      // call redux action
      this.props.addExperience(experienceData, this.props.history);
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
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      originalFrom,
      originalTo
    } = this.state;
    const { match } = this.props;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              {match.path === "/add-experience" && (
                <React.Fragment>
                  <h1 className="display-4 text-center">Add Experience</h1>
                  <p className="lead text-center">
                    Add any job or position that you have had in the past or
                    current
                  </p>
                </React.Fragment>
              )}
              {!(match.path === "/add-experience") && (
                <h1 className="display-4 text-center">Edit Experience</h1>
              )}
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                {!(match.path === "/add-experience") && <h6>Company</h6>}
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                {!(match.path === "/add-experience") && <h6>Job Title</h6>}
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                {!(match.path === "/add-experience") && <h6>Location</h6>}
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                  // hack: this displays only when user is editing.
                  // i.e. when route => /:exp.id
                  // never displays on /add-experience route.
                  // having problems with moment, so this little hack
                  // helps users with the dates
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
                  // hack: this displays only when user is editing.
                  // i.e. when route => /:exp.id
                  // never displays on /add-experience route.
                  // having problems with moment, so this little hack
                  // helps users with the dates
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
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  smallInfo="Tell us about the position"
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
  addExperience,
  getCurrentProfile,
  editExperience
})(withRouter(AddEditExperience));
