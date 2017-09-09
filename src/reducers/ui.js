import {SORT_ORDER_DESC, UI_SORT_ORDER, UI_SORT_PROPERTY} from "../actions/ui";

export function ui(state = {sortOrder: SORT_ORDER_DESC, sortProperty: 'voteScore'}, action) {
  const {type, payload} = action;
  switch (type) {
    case UI_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload
      };
    case UI_SORT_PROPERTY:
      return {
        ...state,
        sortProperty: payload
      };
    default:
      return state;
  }
}
