import {LOAD_POSTS} from "../actions/posts";

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
    default:
      return state;
  }
}
