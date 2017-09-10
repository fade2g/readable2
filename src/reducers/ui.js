import {SORT_ORDER_DESC, UI_LOADING_STATE, UI_SORT_ORDER, UI_SORT_PROPERTY} from "../actions/ui";

export function ui(state = {sortOrder: SORT_ORDER_DESC, sortProperty: 'voteScore', loading: {}}, action) {
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
    case UI_LOADING_STATE:
      let loadingType = state.loading[payload.type] || {};
      if (payload.active) {
        loadingType[payload.unitId] = 'active'
      } else {
        delete loadingType[payload.unitId]
      }
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.type]: loadingType
        }
      };
    default:
      return state;
  }
}
