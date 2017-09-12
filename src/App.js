import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadCategoriesFetch} from "./actions/categories";
import Header from "./header/header.component";
import PostsView from "./posts-view/posts-view.component";
import PostView from "./post/post-view";

class App extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
        <Header/>
        {this.props.categories && Object.values(this.props.categories).map((cat) => {
          return <Link key={cat.path} to={cat.path !== null ? `/category/${cat.path}` : '/'}
                       className="item">{cat.name}</Link>
        })}
        <div className="main container ui basic segment">
          <Switch>
            <Route exact path="/category/:category" render={(props) => (
              <PostsView category={props.match.params.category}/>
            )}/>
            <Route exact path="/" render={(props) => (
              <PostsView category={undefined}/>)
            }/>
            <Route exact path="/:categoryId/:postId" render={(props) => (
              <PostView categoryId={props.match.params.categoryId} postId={props.match.params.postId}/>
            )}/>
          </Switch>
        </div>
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
