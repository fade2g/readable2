import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadCategoriesFetch} from "./actions/categories";
import PostsView from "./posts-view/posts.component"

class App extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
        this is the main app
        <Route path="/category/:category" component={PostsView}/>
        <Route path="/post/:postid" component={PostsView}/>
      </div>
    );
  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: loadCategoriesFetch(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
