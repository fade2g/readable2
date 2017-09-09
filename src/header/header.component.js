import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class Header extends Component {

  render () {
    let {menuItems} = this.props;

    return (<div className="ui fixed inverted menu">
      <div className="ui container">
        <span className="item">Readable</span>
        <div className="ui simple dropdown item">
          select category
          <i className="dropdown icon" />
          <div className="menu">
            {menuItems && menuItems.map((menuItem) => {
              return <Link key={menuItem.id} to={menuItem.id !== null ? `/category/${menuItem.id}`: '/'} className="item">{menuItem.title}</Link>
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

export default connect(mapStateToProps)(Header)
