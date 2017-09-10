import {SET_LOADING, UNSET_LOADING} from "../actions/loading";

export function loading(state = {}, action) {
  const {type, payload} = action;
  let loadingType;
  switch (type) {
    case SET_LOADING:
      loadingType = state[payload.type] || {};
      loadingType[payload.unitId] = 'active';
      return {
        ...state,
        [payload.type]: loadingType
      };
    case UNSET_LOADING:
      loadingType = state[payload.type] || {};
      delete loadingType[payload.unitId];
      return {
        ...state,
        [payload.type]: loadingType
      };
    default:
      return state;
  }
}
