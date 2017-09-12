import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {backendNewComment, backendDeleteComment, backendLoadPostComments} from "../actions/posts";
import {connect} from "react-redux";
import PostComment from "./comment"

class PostComments extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    postId: PropTypes.string.isRequired
  };

  componentDidMount() {
    if (!this.props.comments[this.props.postId]) {
      this.props.loadComments(this.props.postId)
    }
  }

  submitComment = (e) => {
    if (!(this.postComment.value && this.postAuthor.value)) {
      return
    }
    e.preventDefault();
    this.props.addComment(this.props.postId, this.postAuthor.value, this.postComment.value);
    this.postComment.value = '';
    this.postAuthor.value = '';
  };

  render() {

    if (!this.props.comments || !this.props.comments[this.props.postId]) {
      return null;
    }
    let comments = this.props.comments[this.props.postId];
    comments.sort((comment1, comment2) => comment1.timestamp < comment2.timestamp);
    return (
      <div className="ui comments fullwidth">
        {comments && comments.length > 0 && comments.map(comment => {
            const callback = ((postId, commentId) => {
              return () => {
                this.props.deleteComment(postId, commentId)
              }
            })(this.props.postId, comment.id);
            return (<PostComment key={comment.id} comment={comment} deleteComment={callback}/>);
          }
        )}
        {(!comments || comments.length === 0) &&
        <p>Empty here but we're sure you've got something to say about it. Go participate</p>
        }
        <div className="ui horizontal divider">
          Participate
        </div>
        <form className="ui reply form" onSubmit={this.submitComment}>
          <div className="field">
            <textarea ref={(input) => this.postComment = input}
                      placeholder="Post a reply"
                      required/>
          </div>
          <div className="fields">
            <div className="ten wide field">
              <input ref={(input) => this.postAuthor = input}
                     placeholder="Your name"
                     required/>
            </div>
            <div className="two wide field">&nbsp;</div>
            <div className="four wide field right floated" style={{textAlign: "right"}}>
              <button type="submit" className="right ui blue labeled submit icon button">
                <i className="icon send outline"/> Add Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


function mapStateToProps({comments, loading}) {
  return {
    comments,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: backendLoadPostComments(dispatch),
    addComment: backendNewComment(dispatch),
    deleteComment: backendDeleteComment(dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostComments)
