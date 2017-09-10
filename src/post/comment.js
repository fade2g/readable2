import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Modal from 'react-modal';
import {editCommentPut, voteCommentUpdate} from "../actions/posts";
import {connect} from "react-redux";

class PostComment extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  state = {
    editCommentOpen: false,
    editFormAuthor: '',
    editFormBody: ''
  };

  openEdit = () => {
    this.setState(
      {
        editFormBody: this.props.comment.body,
        editCommentOpen: true,
      }
    )
  };

  closeEdit = () => {
    this.setState({editCommentOpen: false});
  };

  updateComment = (e) => {
    let {editFormBody} = this.state;
    let {updateComment, comment} = this.props;
    if (editFormBody === '') {
      return
    }
    e.preventDefault();
    updateComment(comment.id, editFormBody);
    this.closeEdit();
  };

  render() {
    const {comment, vote, deleteComment} = this.props;
    return (
      <div className="comment">
        <div className="content">
          <span className="author">{comment.author}</span>
          <div className="metadata">
            {comment.voteScore} points, <span className="date"><Moment
            fromNow>{new Date(comment.timestamp)}</Moment></span>
          </div>
          <div className="text">
            {comment.body}
          </div>
          <div className="actions">
            <i className="rdbl stacked caret up icon" onClick={vote(comment.id, true)}/>
            <i className="rdbl stacked caret down icon" onClick={vote(comment.id, false)}/>
            <a className="reply" onClick={this.openEdit}>Edit</a>
            <a className="reply" onClick={deleteComment}>Delete</a>
          </div>
        </div>

        {/* EDIT COMMENT MODAL */}

        <Modal
          isOpen={this.state.editCommentOpen}
          className='rdbl modal'
          overlayClassName='rdbl overlay'
          contentLabel='Edit Post Comment Form'
        >
          <form className="ui form">
            <h4>Edit Comment</h4>
            <div className="field">
              <label>Message</label>
              <textarea type="text" name="message" placeholder="Enter post comment" required
                        value={this.state.editFormBody}
                        onChange={(e) => this.setState({editFormBody: e.target.value})}/>
            </div>
            <div className="ui actions">
              <button type="cancel" className="ui button labeled icon" onClick={this.closeEdit}><i
                className="icon undo"/>Cancel
              </button>
              <button type="submit" className="blue ui button labeled icon" onClick={this.updateComment}><i
                className="icon send outline"/>Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    vote: voteCommentUpdate(dispatch),
    updateComment: editCommentPut(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
