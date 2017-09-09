import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {loadPostFetch} from "../actions/posts";

class PostView extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.load(this.props.postId);
  }

  render() {
    const post = this.props.posts[this.props.postId]
    if (!post) {
      return null;
    }
    return (<div className="post-view">
      <h2>{post.title}</h2>
      <div>{post.body}</div>
    </div>)

  }
}

function mapStateToProps({categories, posts}) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: loadPostFetch(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
