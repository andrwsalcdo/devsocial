import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/postActions";
import { addComment } from "../../redux/actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class TextForm extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.errors !== nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  state = {
    text: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newText = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    if (this.props.postId) {
      // call redux action
      this.props.addComment(this.props.postId, newText);
    } else {
      // call redux aciton
      this.props.addPost(newText);
    }
    // clear text area
    this.setState({ text: "" });
  };

  render() {
    const { errors, text } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            {this.props.postId ? "Make a Comment" : "Say Something..."}
          </div>
          <div className="card-body">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder={
                    this.props.postId ? "Reply to Post" : "Create a Post"
                  }
                  name="text"
                  value={text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost, addComment })(TextForm);
