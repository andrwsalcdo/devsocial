import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import PostForm from "./PostForm";
import Spinner from "../common/spinner/Spinner";
import PostItem from "./PostItem";

class Posts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getAllPosts: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {posts === null || loading ? (
                <Spinner />
              ) : (
                posts.map(post => <PostItem key={post._id} post={post} />)
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

export default connect(mapStateToProps, {
  getAllPosts
})(Posts);
