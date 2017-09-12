import {DELETE_POST, LOAD_POST, LOAD_POSTS, UPDATE_POST} from "../actions/posts";

export function posts(state = {}, action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_POSTS:
      return payload ? payload.reduce((accumulator, post) => {
        return post.deleted ? accumulator : {
          ...accumulator,
          [post.id]: post
        }
      }, {}) : {}; 
    case LOAD_POST:
    case UPDATE_POST:
      return {
        ...state,
        [payload.postId]: payload.post
      };
    case DELETE_POST:
      let cloned = Object.assign({}, state);
      delete cloned[payload.postId];
      return cloned;
    default:
      return state;
  }
}
