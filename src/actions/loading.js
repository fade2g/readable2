export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';

export const LOADING_CATEGORY_ENUM = {
  COMMENTS: 'COMMENTS',
  POSTS: 'POSTS',
  POST: 'POST'
};

export function setLoadingAction(type, unitId) {
  return {
    type: SET_LOADING,
    payload: {
      type,
      unitId
    }
  }
}

export function unsetLoadingAction(type, unitId) {
  return {
    type: UNSET_LOADING,
    payload: {
      type,
      unitId
    }
  }
}
