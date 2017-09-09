import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {loadPostFetch, votePostUpdate} from "../actions/posts";
import Moment from "react-moment";
import PostComments from './comments';

class PostView extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.load(this.props.postId);
  }

  render() {
    const post = this.props.posts[this.props.postId];
    if (!post) {
      return null;
    }
    return (<article className="rdbl post-preview ui raised segment">
      <div className="rdbl post controls">
        <i className="rdbl stacked caret up icon" onClick={this.props.vote(post.id, true)}/>
        <i className="rdbl stacked caret down icon"  onClick={this.props.vote(post.id, false)}/>
      </div>
      <div className="rdbl post content">
        <h2 className="ui header">{post.title}</h2>
        <div className="meta">
          <span>{post.voteScore} points by {post.author} <Moment fromNow>{new Date(post.timestamp)}</Moment></span>
        </div>
        <p>{post.body}</p>
        <PostComments postId={post.id} />
      </div>
    </article>);

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
    load: loadPostFetch(dispatch),
    vote: votePostUpdate(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
