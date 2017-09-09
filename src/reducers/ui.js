import {SORT_ORDER_DESC, UI_SORT_ORDER, UI_SORT_PROPERTY} from "../actions/ui";

export function ui(state = {order: SORT_ORDER_DESC, property: 'voteScore'}, action) {
  const {type, payload} = action;
  switch (type) {
    case UI_SORT_ORDER:
      return {
        ...state,
        order: payload
      };
    case UI_SORT_PROPERTY:
      return {
        ...state,
        property: payload
      };
    default:
      return state;
  }
}
