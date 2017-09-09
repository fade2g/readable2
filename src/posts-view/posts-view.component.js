import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadPostsFetch} from "../actions/posts";
import {withRouter} from "react-router-dom";
import PostPreview from "./post-preview.component";

class PostsView extends Component {

  componentDidMount() {
    this.props.load(this.props.category);
    console.log('mounted with cat ' + this.props.category);
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
    return (<div className="posts-view">
      this is the posts view
      {this.props.posts && Object.values(this.props.posts).map(post => {
        return (<div key={post.id}><PostPreview post={post}/> </div>)
      })}
    </div>)
  }
}

function mapStateToProps({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: loadPostsFetch(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsView));
