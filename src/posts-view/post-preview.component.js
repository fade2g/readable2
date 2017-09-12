import React, {Component} from 'react';
import {deletePostDelete, loadPostCommentsFetch, updatePostPut, votePostUpdate} from "../actions/posts";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import Modal from 'react-modal';
import PostForm from '../post/post-form.component';
import "./post-preview.css";

class PostPreview extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  state = {
    editPost: false
  };


  componentDidMount() {
    this.props.loadComments(this.props.post.id)
  }

  handleDelete = () => {
    this.props.delete(this.props.post.id);
  };

  submitUpdate = (data) => {
    console.log('submit with data', data);
    this.props.update(this.props.post.id, data.title, data.body);
    this.setState({editPost: false});
  };

  cancelUpdate = () => {
    this.setState({editPost: false});
  };

  showEdit = () => {
    this.setState({
      editPost: true
    });
  };

  render() {
    const {post, comments} = this.props;
    return (
      <article className="rdbl post-preview ui raised segment">
        <div className="rdbl post controls">
          <i className="rdbl stacked caret up icon" onClick={this.props.vote(post.id, true)}/>
          <i className="rdbl stacked caret down icon" onClick={this.props.vote(post.id, false)}/>
        </div>
        <div className="rdbl post content">
          <h2 className="ui small header"><Link to={`/${post.category}/${post.id}`}><b>{post.title}</b></Link></h2>
          <div>
            {post.voteScore} points by {post.author} <Moment
            fromNow>{new Date(post.timestamp)}</Moment>, {comments[post.id] ? comments[post.id].length : 'no'} comments.
            <span onClick={this.showEdit}>&nbsp;<i className="edit icon"/>Edit</span>
            <span onClick={this.handleDelete}>&nbsp;<i className="trash outline icon"/>Delete</span>
          </div>
        </div>

        <Modal
          isOpen={this.state.editPost}
          className='rdbl modal'
          overlayClassName='rdbl overlay'
          contentLabel='Edit Post Comment Form'
        >
          <PostForm submit={this.submitUpdate} cancel={this.cancelUpdate} newPost={false} category={post.category}
                    title={post.title} body={post.body} author={post.author}/>
        </Modal>

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
    loadComments: loadPostCommentsFetch(dispatch),
    delete: deletePostDelete(dispatch),
    update: updatePostPut(dispatch),
    vote: votePostUpdate(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview)
