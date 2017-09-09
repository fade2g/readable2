import React, {Component} from 'react';
import {loadPostCommentsFetch} from "../actions/posts";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import "./post-preview.css";

class PostPreview extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadComments(this.props.post.id)
  }

  render() {
    const {post, comments} = this.props;
    return (
      <article className="rdbl post-preview ui raised segment">
        <div className="rdbl post controls">
          <i className="rdbl stacked caret up icon"/><i className="rdbl stacked caret down icon"/>
        </div>
        <div className="rdbl post content">
          <h2 className="ui small header"><Link to={`/post/${post.id}`}><b>{post.title}</b></Link></h2>
          <div>
            {post.voteScore} points by {post.author} <Moment fromNow>{new Date(post.timestamp)}</Moment>, <Link to={`/post/${post.id}`}>{comments[post.id] ? comments[post.id].length : 'no'} comments</Link>
          </div>
        </div>
      </article>);
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
