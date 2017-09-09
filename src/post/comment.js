import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';

class PostComment extends Component {

  static propTypes = {
    comment: PropTypes.object
  }

  render() {
    const {comment} = this.props;
    return (
      <div className="comment">
        <div className="content">
          <a className="author">{comment.author}</a>
          <div className="metadata">
            <span className="date"><Moment fromNow>{new Date(comment.timestamp)}</Moment></span>
          </div>
          <div className="text">
            {comment.body}
          </div>
          <div className="actions">
            <a className="reply">Reply</a>
          </div>
        </div>
      </div>
    )
  }
}

export default PostComment
