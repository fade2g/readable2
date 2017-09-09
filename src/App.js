import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadCategoriesFetch} from "./actions/categories";

class App extends Component {

  componentDidMount() {
    this.props.loadCategories()
  }

  render() {
    return (
      <div className="App">
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
