import {ADD_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, UPDATE_COMMENT} from "../actions/posts";

export function comments(state = {}, action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [payload.postId]: payload.comments
        };
    case UPDATE_COMMENT:
      return {
      ...state,
      [payload.postId]: state[payload.postId].map(comment => comment.id === payload.comment.id ? payload.comment : comment)
    };
    case ADD_COMMENT:
      return {
        ...state,
        [payload.postId]: [payload.comment].concat(state[payload.postId])
      };
    case DELETE_COMMENT: {
      return {
        ...state,
        [payload.postId]: state[payload.postId].filter(comment => comment.id !== payload.commentId)
      }
    }
    default:
      return state;
  }
}
