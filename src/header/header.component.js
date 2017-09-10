import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {setPostSortOrder, setPostSortProperty, SORT_ORDER_ASC, SORT_ORDER_DESC} from "../actions/ui";


class Header extends Component {

  render () {
    let {menuItems} = this.props;
    let sortProperties = [
      {id: 'voteScore', title: 'Votes'},
      {id: 'timestamp', title: 'Age'}
    ];
    let sortOrder = [
      {id: SORT_ORDER_ASC, title: 'Ascending'},
      {id: SORT_ORDER_DESC, title: 'Descending'}
    ];

    return (<div className="ui fixed inverted menu">
      <div className="ui container">
        <span className="item">Readable</span>
        <div className="ui simple dropdown item">
          <i className="icon filter" />select category
          <i className="dropdown icon" />
          <div className="menu">
            {menuItems && menuItems.map((menuItem) => {
              return <Link key={menuItem.id} to={menuItem.id !== null ? `/category/${menuItem.id}`: '/'} className="item">{menuItem.title}</Link>
            })}
          </div>
        </div>
        <div className="ui simple dropdown item">
          <i className="icon selected radio" />Sort by
          <i className="dropdown icon" />
          <div className="menu">
            {sortProperties.map((menuItem) => {
              return <div key={menuItem.id} className="item" onClick={() => this.props.setProperty(menuItem.id)}>{menuItem.title}</div>
            })}
          </div>
        </div>
        <div className="ui simple dropdown item">
          <i className="icon sort" />Sort Order
          <i className="dropdown icon" />
          <div className="menu">
            {sortOrder.map((menuItem) => {
              return <div key={menuItem.id} className="item" onClick={() => {this.props.setOrder(menuItem.id)}}>{menuItem.title}</div>
            })}
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps({categories}) {
  return {
    menuItems: [{id: null, title: 'All posts'}]
      .concat(categories && categories.map((cat) => {return {id: cat.path, title: cat.name}}))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setOrder: (order) => dispatch(setPostSortOrder(order)),
    setProperty: (property) => dispatch(setPostSortProperty(property))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
