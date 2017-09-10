import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {loadPostCommentsFetch} from "../actions/posts";
import {connect} from "react-redux";
import PostComment from "./comment"
import {LOADING_CATEGORY_ENUM} from "../actions/loading";

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

  render() {

    if (!this.props.comments || !this.props.comments[this.props.postId]) {
      return null;
    }
    const comments = this.props.comments[this.props.postId];
    return (
      <div className="ui comments">
        Loading State: {this.props.loading[LOADING_CATEGORY_ENUM.COMMENTS][this.props.postId]}
        {comments && comments.map(comment => {
            return (<PostComment key={comment.id} comment={comment} />);
          }
        )}
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
    loadComments: loadPostCommentsFetch(dispatch)
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(PostComments)
