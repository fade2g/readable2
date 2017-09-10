import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadPostsFetch, newPost} from "../actions/posts";
import {withRouter} from "react-router-dom";
import PostPreview from "./post-preview.component";
import PostForm from "../post/post-form.component";
import Modal from 'react-modal';
import {SORT_ORDER_DESC} from "../actions/ui";
import {LOADING_CATEGORY_ENUM} from "../actions/loading";

class PostsView extends Component {

  state = {
    newPost: false
  };

  componentDidMount() {
    this.props.load(this.props.category);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category !== nextProps.category) {
      this.props.load(nextProps.category);
    }
  }

  render() {
    if (!this.props.posts) {
      return null;
    }
    const {sortProperty, sortOrder} = this.props.ui;
    const postsArray = Object.values(this.props.posts).sort((post1, post2) => {
      return sortOrder === SORT_ORDER_DESC ? post1[sortProperty] > post2[sortProperty] : post1[sortProperty] < post2[sortProperty];
    });
    const loading = this.props.loading[LOADING_CATEGORY_ENUM.POSTS] && this.props.loading[LOADING_CATEGORY_ENUM.POSTS][this.props.category];
    return (<div className="posts-view very padded text container segment">
        <div className={"ui " + (loading ? "active loader" : "")}>
          {postsArray.map(post => {
            return (<PostPreview key={post.id} post={post}/>)
          })}
        </div>
        <button className="ui blue labeled submit icon button" onClick={this.openPostModal}>
          <i className="icon write square"/> New Post
        </button>
        <Modal
          isOpen={this.state.newPost}
          className='rdbl modal'
          overlayClassName='rdbl overlay'
          contentLabel='Edit Post Comment Form'
        >
          <PostForm submit={this.submitNewPost} cancel={this.cancelNewPost} newPost={true} category={this.props.category}/>
        </Modal>
      </div>
    )
  }

  openPostModal = () => {
    this.setState({
      newPost: true
    });
  };

  submitNewPost = (data) => {
    console.log('New post', data);
    this.setState({
      newPost: false
    });
    this.props.newPost(data.title, data.body, data.author, data.category);
  };

  cancelNewPost = (data) => {
    console.log('New post', data);
    this.setState({
      newPost: false
    });
  };

}

function mapStateToProps({posts, ui, loading}) {
  return {
    posts,
    ui,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: loadPostsFetch(dispatch),
    newPost: newPost(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsView));
