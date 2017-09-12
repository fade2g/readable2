import {
  deleteComment, deletePost, getPost, fetchPostComments, getPosts, postCommentVote, postComment, postPost,
  postVote, putComment, putPost
} from "../util/api";
import {setLoadingAction, unsetLoadingAction, LOADING_CATEGORY_ENUM} from "./loading";

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';

function loadPostsAction(posts) {
  return {
    type: LOAD_POSTS,
    payload: posts
  }
}

export const backendLoadPosts = (dispatch) => {
  return function (category) {
    dispatch(setLoadingAction(LOADING_CATEGORY_ENUM.POSTS, category));
    getPosts(category)
      .then((response) => {
        dispatch(unsetLoadingAction(LOADING_CATEGORY_ENUM.POSTS, category));
        return dispatch(loadPostsAction(response))
      })
  }
};

function loadPostAction(postId, post) {
  return {
    type: LOAD_POST,
    payload: {
      postId: postId,
      post: post
    }
  }
}

export const backendLoadPost = (dispatch) => {
  return function (postId) {
    dispatch(setLoadingAction(LOADING_CATEGORY_ENUM.POST, postId));
    getPost(postId)
      .then((response) => {
        dispatch(unsetLoadingAction(LOADING_CATEGORY_ENUM.POST, postId));
        return dispatch(loadPostAction(postId, response))
      })
  }
};

function loadCommentsAction(postId, comments) {
  return {
    type: LOAD_COMMENTS,
    payload: {
      postId,
      comments
    }
  }
}

export const backendLoadPostComments = (dispatch) => {
  return function (postId) {
    dispatch(setLoadingAction(LOADING_CATEGORY_ENUM.COMMENTS, postId));
    fetchPostComments(postId)
      .then(response => {
        dispatch(unsetLoadingAction(LOADING_CATEGORY_ENUM.COMMENTS, postId));
        return dispatch(loadCommentsAction(postId, response))
      })
  }
};

function updatePostAction(postId, updatedPost) {
  return {
    type: UPDATE_POST,
    payload: {
      postId: postId,
      post: updatedPost
    }
  }
}

export function backendVotePost(dispatch) {
  return function (postId, up) {
    return function () {
      postVote(postId, up)
        .then(response => dispatch(updatePostAction(postId, response)))
    }
  }
}

function updateCommentAction(postId, updatedComment) {
  return {
    type: UPDATE_COMMENT,
    payload: {
      postId: postId,
      comment: updatedComment
    }
  }
}

export function backendVoteComment(dispatch) {
  return function (commentId, up) {
    return function () {
      postCommentVote(commentId, up)
        .then(response => dispatch(updateCommentAction(response.parentId, response)))
    }
  }
}

function newCommentAction(postId, newComment) {
  return {
    type: ADD_COMMENT,
    payload: {
      postId,
      comment: newComment
    }
  }
}
export function backendNewComment(dispatch) {
  return function (postId, author, body) {
    postComment(postId, author, body)
      .then(response => dispatch(newCommentAction(postId, response)))
  }
}

function deleteCommentAction(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    payload: {
      postId,
      commentId
    }
  }
}

export function backendDeleteComment(dispatch) {
  return function (postId, commentId) {
    deleteComment(commentId)
      .then(response => dispatch(deleteCommentAction(postId, commentId)))
  }
}


export function backendUpdateComment(dispatch) {
  return (commentId, body) => {
    putComment(commentId, body)
      .then(response => dispatch(updateCommentAction(response.parentId, response)))
  }
}

export function backendNewPost(dispatch) {
  return function (title, body, author, category) {
    postPost(title, body, author, category)
      .then(response => dispatch(loadPostAction(response.id, response)))
  }
}

function deletePostAction(postId) {
  return {
    type: DELETE_POST,
    payload: {
      postId
    }
  }
}

export function backendDeletePost(dispatch) {
  return function(postId) {
    deletePost(postId)
      .then(response => dispatch(deletePostAction(postId)))
  }
}

export function backendUpdatePost(dispatch) {
  return function(postId, title, body) {
    putPost(postId, title, body)
      .then(response => dispatch(loadPostAction(postId, response)))
  }
}
