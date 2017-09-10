import React, {Component} from 'react';
import PropTypes from 'prop-types'

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

  handleChangeCategory = (e) => {
    this.setState({category: e.target.value})
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
    const {newPost} = this.props;
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
            <input type="text" name="post" placeholder="Category" required value={this.state.category} onChange={this.handleChangeCategory}/>
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

export default PostForm
