import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/postActions";

const CommentItem = ({ comment, postId, auth, deleteComment }) => {
  const handleDeleteComment = (postId, commentId) => {
    // call redux action
    deleteComment(postId, commentId);
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to="/">
            <img
              src={comment.avatar}
              alt={`commenter's avatar`}
              className="rounded-circle d-none d-md-block"
            />
          </Link>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id && (
            <button
              type="button"
              onClick={() => handleDeleteComment(postId, comment._id)}
              className="btn btn-danger mr-1"
            >
              <i className="fa fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
