export const SET_LOADING = 'SET_LOADING';
export const UNSET_LOADING = 'UNSET_LOADING';

export function setLoading(type, unitId) {
  return {
    type: SET_LOADING,
    payload: {
      type,
      unitId
    }
  }
}

export function unsetLoading(type, unitId) {
  return {
    type: UNSET_LOADING,
    payload: {
      type,
      unitId
    }
  }
}
