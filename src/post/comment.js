import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import {voteCommentUpdate} from "../actions/posts";
import {connect} from "react-redux";

class PostComment extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    comment: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  };

  render() {
    const {comment} = this.props;
    return (
      <div className="comment">
        <div className="content">
          <span className="author">{comment.author}</span>
          <div className="metadata">
            {comment.voteScore} points, <span className="date"><Moment fromNow>{new Date(comment.timestamp)}</Moment></span>
          </div>
          <div className="text">
            {comment.body}
          </div>
          <div className="actions">
            <i className="rdbl stacked caret up icon" onClick={this.props.vote(comment.id, true)}/>
            <i className="rdbl stacked caret down icon" onClick={this.props.vote(comment.id, false)}/>
            <a className="reply" onClick={this.props.delete}>Delete</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: voteCommentUpdate(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
