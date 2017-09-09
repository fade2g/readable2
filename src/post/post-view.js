import React, {Component} from 'react';
import {connect} from "react-redux";

class PostView extends Component {

  render() {
    return (<div className="post-view">
      this is the single post view
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

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
