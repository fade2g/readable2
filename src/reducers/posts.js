import {LOAD_POSTS, UPDATE_POST} from "../actions/posts";

export function posts(state = [], action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_POSTS:
      return payload.reduce((accumulator, post) => {
        return {
          ...accumulator,
          [post.id]: post
        }
      }, {});
    case UPDATE_POST:
      return {
        ...state,
        [payload.postId]: payload.post
      };
    default:
      return state;
  }
}
