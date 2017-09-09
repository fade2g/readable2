import {LOAD_COMMENTS} from "../actions/posts";

export function comments(state = {}, action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [payload.postId]: payload.comments
        };
    default:
      return state;
  }
}
