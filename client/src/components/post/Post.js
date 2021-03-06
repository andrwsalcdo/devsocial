import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/postActions";
import Spinner from "../common/spinner/Spinner";
import PostItem from "../posts/PostItem";
import TextForm from "../posts/TextForm";
import CommentItem from "./commentItem";

class Post extends Component {
  static propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  render() {
    const { post, loading } = this.props.post;
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {post === null || loading || Object.keys(post).length === 0 ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  <PostItem post={post} showActions={false} />
                  <TextForm postId={post._id} />
                  {post.comments.length > 0 &&
                    post.comments.map(comment => (
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                      />
                    ))}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
