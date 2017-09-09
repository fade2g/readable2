import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadPostsFetch} from "../actions/posts";
import {withRouter} from "react-router-dom";
import PostPreview from "./post-preview.component";
import {SORT_ORDER_DESC} from "../actions/ui";

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
    const {sortProperty, sortOrder} = this.props.ui;
    const postsArray = Object.values(this.props.posts).sort((post1, post2) => {
      return sortOrder === SORT_ORDER_DESC ? post1[sortProperty] > post2[sortProperty] : post1[sortProperty] < post2[sortProperty];
    });
    return (<div className="posts-view very padded text container segment">
      {postsArray.map(post => {
        return (<PostPreview key={post.id} post={post}/>)
      })}
    </div>)
  }
}

function mapStateToProps({posts, ui}) {
  return {
    posts,
    ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: loadPostsFetch(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsView));
