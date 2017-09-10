import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addCommentPost, loadPostCommentsFetch} from "../actions/posts";
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
      <div className="ui comments">
        {comments && comments.map(comment => {
            return (<PostComment key={comment.id} comment={comment}/>);
          }
        )}
        <form className="ui reply form" onSubmit={this.submitComment}>
          <div className="field">
            <textarea ref={(input) => this.postComment = input}
                      placeholder="Post a reply"
                      required/>
          </div>
          <div className="field">
            <input ref={(input) => this.postAuthor = input}
                   placeholder="Your name"
                   required/>
          </div>
          <button type="submit" className="ui blue labeled submit icon button">
            <i className="icon edit"/> Add Reply
          </button>
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
    loadComments: loadPostCommentsFetch(dispatch),
    addComment: addCommentPost(dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostComments)
