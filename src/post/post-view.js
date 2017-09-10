import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {deletePostDelete, loadPostFetch, votePostUpdate} from "../actions/posts";
import Moment from "react-moment";
import PostComments from './comments';
import {LOADING_CATEGORY_ENUM} from "../actions/loading";
import {withRouter} from "react-router-dom";

class PostView extends Component {

  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    postId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.load(this.props.postId);
  }

  handleDelete = () => {
    this.props.delete(this.props.postId);
    this.props.history.push('/');
  };

  render() {
    const post = this.props.posts[this.props.postId];
    if (!post) {
      return null;
    }
    const loading = this.props.loading[LOADING_CATEGORY_ENUM.POST] && this.props.loading[LOADING_CATEGORY_ENUM.POST][this.props.postId];
    return (<article className="ui raised segment">
      <div className={"ui " + (loading ? "active loader" : "")}>
        <div className="post content">
          <div className="ui header black inverted segment">
            <h2>{post.title}</h2>
            <div className="meta">
              <h4 className="ui tiny">{post.voteScore} points by {post.author} <Moment
                fromNow>{new Date(post.timestamp)}</Moment></h4>
            </div>
          </div>
          <div className="ui floated right mini basic icon buttons">
            <button className="ui button" onClick={this.props.vote(post.id, true)}><i className="caret up icon"/>
            </button>
            <button className="ui button" onClick={this.props.vote(post.id, false)}><i className="caret down icon"/>
            </button>
            <button className="ui button"><i className="upload icon"/></button>
            <button className="ui floated right red basic button" onClick={this.handleDelete}><i className="trash outline icon"/>Delete
            </button>
          </div>
          <br/>
          <p>{post.body}</p>

          <div className="ui horizontal divider">
            Comments
          </div>
          <PostComments postId={post.id} className="ui segment"/>
        </div>
      </div>
    </article>);

  }
}

function mapStateToProps({categories, posts, loading}) {
  return {
    categories,
    posts,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: loadPostFetch(dispatch),
    delete: deletePostDelete(dispatch),
    vote: votePostUpdate(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));
