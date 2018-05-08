import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };
    // call redux action
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevSocial account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                  smallInfo="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
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
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
