import React, {Component} from 'react';
import {loadPostCommentsFetch} from "../actions/posts";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class PostPreview extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadComments(this.props.post.id)
  }

  render() {
    const {post, comments} = this.props;
    console.log(comments);
    return (
      <div className="post-preview">
        id:{post.id} - <Link to={`/post/${post.id}`}>title:{post.title}</Link> - cat:{post.category} - #comments: {comments[post.id] ? comments[post.id].length : 'none'}
      </div>);
  }
}

function mapStateToProps({posts, comments}) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: loadPostCommentsFetch(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview)
