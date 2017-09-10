import {fetchPost, fetchPostComments, fetchPosts, postCommentVote, postVote} from "../util/api";
import {setLoading, unsetLoading} from "./loading";

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

function loadPostsDispatch(posts) {
  return {
    type: LOAD_POSTS,
    payload: posts
  }
}

export const loadPostsFetch = (dispatch) => {
  return function (category) {
    fetchPosts(category)
      .then((response) => {
        return dispatch(loadPostsDispatch(response))
      })
  }
};

function loadPostDispatch(postId, post) {
  return {
    type: LOAD_POST,
    payload: {
      postId: postId,
      post: post
    }
  }
}

export const loadPostFetch = (dispatch) => {
  return function(postId) {
    fetchPost(postId)
      .then((response) => {
        return dispatch(loadPostDispatch(postId, response))
      })
  }
};

function loadCommentsDispatch(postId, comments) {
  return {
    type: LOAD_COMMENTS,
    payload: {
      postId,
      comments
    }
  }
}

export const loadPostCommentsFetch = (dispatch) => {
  return function (postId) {
    dispatch(setLoading('comments', postId, true));
    fetchPostComments(postId)
      .then(response => {
        dispatch(unsetLoading('comments', postId));
        return dispatch(loadCommentsDispatch(postId, response))
      })
  }
};

function votePost(postId, updatedPost) {
  return {
    type: UPDATE_POST,
    payload: {
      postId: postId,
      post: updatedPost
    }
  }
}

export function votePostUpdate(dispatch) {
  return function (postId, up) {
    return function () {
      postVote(postId, up)
        .then(response => dispatch(votePost(postId, response)))
    }
  }
}

function voteComment(postId, updatedComment) {
  return {
    type: UPDATE_COMMENT,
    payload: {
      postId: postId,
      comment: updatedComment
    }
  }
}

export function voteCommentUpdate(dispatch) {
  return function (commentId, up) {
    return function() {
      postCommentVote(commentId, up)
        .then(response => dispatch(voteComment(response.parentId, response)))
    }
  }
}
