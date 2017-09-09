import React, {Component} from 'react';
import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadCategoriesFetch} from "./actions/categories";
import PostsView from "./posts-view/posts-view.component";
import PostView from "./post/post-view";

class App extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
        this is the main app
        {this.props.categories && Object.values(this.props.categories).map((cat) => {
          return <Link key={cat.path} to={cat.path !== null ? `/category/${cat.path}` : '/'}
                       className="item">{cat.name}</Link>
        })}
        {/* <Route path="/category/:category" component={PostsView}/>*/}
        <Route path="/category/:category" render={(props) => (
          <PostsView category={props.match.params.category}/>)
        }/>
        <Route exact path="/" render={(props) => (
          <PostsView category={undefined}/>)
        }/>
        <Route path="/post/:postid" component={PostView}/>
        <Link to="/">Go to home</Link>
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
