import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {backendDeletePost, backendLoadPost, backendUpdatePost, backendVotePost} from "../actions/posts";
import Moment from "react-moment";
import PostComments from './comments';
import PostForm from './post-form.component';
import Modal from 'react-modal';
import {LOADING_CATEGORY_ENUM} from "../actions/loading";
import {withRouter} from "react-router-dom";

class PostView extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    postId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired
  };

  state = {
    editPost: false
  };

  componentDidMount() {
    this.props.load(this.props.postId);
  }

  handleDelete = () => {
    this.props.delete(this.props.postId);
    this.props.history.push('/');
  };

  submitUpdate = (data) => {
    console.log('submit with data', data);
    this.props.update(this.props.postId, data.title, data.body);
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
    const post = this.props.posts[this.props.postId];
    if (!post) {
      return null;
    }
    const loading = this.props.loading[LOADING_CATEGORY_ENUM.POST] && this.props.loading[LOADING_CATEGORY_ENUM.POST][this.props.postId];
    return (<article className="ui raised segment">
      <div className={"ui " + (loading ? "active loader" : "")}>
        <div className="post content">
          <div className="ui header black inverted segment">
            <h2>{post.title}</h2>
            <div className="meta">
              <h4 className="ui tiny">{post.voteScore} points by {post.author} <Moment
                fromNow>{new Date(post.timestamp)}</Moment></h4>
            </div>
          </div>
          <div className="ui floated right mini basic icon buttons">
            <button className="ui button" onClick={this.props.vote(post.id, true)}><i className="caret up icon"/>
            </button>
            <button className="ui button" onClick={this.props.vote(post.id, false)}><i className="caret down icon"/>
            </button>
            <button className="ui blue basic button" onClick={this.showEdit}><i className="edit icon"/>Edit</button>
            <button className="ui red basic button" onClick={this.handleDelete}>
              <i className="trash outline icon"/>Delete
            </button>
          </div>
          <br/>
          <p>{post.body}</p>

          <div className="ui horizontal divider">
            Comments
          </div>
          <PostComments postId={post.id} className="ui segment"/>
        </div>

        {/* MODAL FOR EDIT OF POST */}

        <Modal
          isOpen={this.state.editPost}
          className='rdbl modal'
          overlayClassName='rdbl overlay'
          contentLabel='Edit Post Comment Form'
        >
          <PostForm submit={this.submitUpdate} cancel={this.cancelUpdate} newPost={false} category={post.category}
                    title={post.title} body={post.body} author={post.author}/>
        </Modal>
      </div>
    </article>);

  }
}

function mapStateToProps({categories, posts, loading}) {
  return {
    categories,
    posts,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: backendLoadPost(dispatch),
    delete: backendDeletePost(dispatch),
    update: backendUpdatePost(dispatch),
    vote: backendVotePost(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
