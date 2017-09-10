import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

class PostForm extends Component {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    newPost: PropTypes.bool.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: props.title || '',
      body: props.body || '',
      author: props.author || '',
      category: props.category || ''
    };
  }

  handleChangeTitle = (e) => {
    this.setState({title: e.target.value})
  };

  handleChangeBody = (e) => {
    this.setState({body: e.target.value})
  };

  handleChangeAuthor = (e) => {
    this.setState({author: e.target.value})
  };

  handleChangeCategory = (e, id) => {
    this.setState({category: id})
  };

  handleCancel = (e) => {
    this.props.cancel();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit({
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    })
  };

  render() {
    const {newPost, categories} = this.props;
    return (
      <div>
        <form className="ui form">
          <h4>{newPost ? 'New Post' : 'Edit Post'}</h4>
          <div className="field">
            <label>Title</label>
            <input type="text" name="post" placeholder="Title" required value={this.state.title} onChange={this.handleChangeTitle}/>
          </div>
          <div className="field">
            <label>Post</label>
            <textarea type="text" name="post" placeholder="Post" required value={this.state.body} onChange={this.handleChangeBody}/>
          </div>
          <div className="field">
            <label>Author</label>
            <input type="text" name="post" placeholder="Author" required value={this.state.author} onChange={this.handleChangeAuthor}/>
          </div>
          <div className="field">
            <label>Category</label>
            <div className="ui simple dropdown">
              <i className="icon filter" />{this.state.category ? categories.filter(cat => cat.path === this.state.category)[0].name : 'Select category'}
              <i className="dropdown icon" />
              <div className="menu">
                {categories && categories.map((category) => {
                  return <div className="ui item" key={category.path} onClick={((id) => { return (e) => { this.handleChangeCategory(e, id); }})(category.path)}>{category.name}</div>
                })}
              </div>
            </div>
          </div>
          <div className="ui actions">
            <button type="cancel" className="ui button labeled icon" onClick={this.handleCancel}><i className="icon undo"/>Cancel</button>
            <button type="submit" className="blue ui button labeled icon" onClick={this.handleSubmit}><i className="icon send outline"/>Submit</button>
          </div>
        </form>
      </div>
    )
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

export default connect(mapStateToProps)(PostForm)
