import {fetchPostCommets, fetchPosts, postVote} from "../util/api";

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const UPDATE_POST = 'UPDATE_POST';

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
    fetchPostCommets(postId)
      .then(response => {
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
