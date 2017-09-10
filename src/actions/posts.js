import {fetchPost, fetchPostComments, fetchPosts, postCommentVote, postNewComment, postVote} from "../util/api";
import {setLoading, unsetLoading, LOADING_CATEGORY_ENUM} from "./loading";

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

function loadPostsDispatch(posts) {
  return {
    type: LOAD_POSTS,
    payload: posts
  }
}

export const loadPostsFetch = (dispatch) => {
  return function (category) {
    dispatch(setLoading(LOADING_CATEGORY_ENUM.POSTS, category));
    fetchPosts(category)
      .then((response) => {
        dispatch(unsetLoading(LOADING_CATEGORY_ENUM.POSTS, category));
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
  return function (postId) {
    dispatch(setLoading(LOADING_CATEGORY_ENUM.POST, postId));
    fetchPost(postId)
      .then((response) => {
        dispatch(unsetLoading(LOADING_CATEGORY_ENUM.POST, postId));
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
    dispatch(setLoading(LOADING_CATEGORY_ENUM.COMMENTS, postId));
    fetchPostComments(postId)
      .then(response => {
        dispatch(unsetLoading(LOADING_CATEGORY_ENUM.COMMENTS, postId));
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
    return function () {
      postCommentVote(commentId, up)
        .then(response => dispatch(voteComment(response.parentId, response)))
    }
  }
}

function addComment(postId, newComment) {
  return {
    type: ADD_COMMENT,
    payload: {
      postId,
      comment: newComment
    }
  }
}
export function addCommentPost(dispatch) {
  return function (postId, author, body) {
    postNewComment(postId, author, body)
      .then(response => dispatch(addComment(postId, response)))
  }
}
