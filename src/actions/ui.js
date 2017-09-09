export const UI_SORT_ORDER = 'UI_SORT_ORDER';
export const UI_SORT_PROPERTY = 'UI_SORT_PROPERTY';

export const SORT_ORDER_ASC = 'ASC';
export const SORT_ORDER_DESC = 'DESC';

export function setPostSortProperty(property) {
  return {
    type: UI_SORT_PROPERTY,
    payload: property
  }
}

export function setPostSortOrder(order) {
  return {
    type: UI_SORT_ORDER,
    payload: order
  }
}
