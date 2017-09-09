import React, {Component} from 'react';
import {connect} from "react-redux";

class PostsView extends Component {

  render() {
    return (<div className="posts-view">
      this is the posts view
    </div>)

  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
