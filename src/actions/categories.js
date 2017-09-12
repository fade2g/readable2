import {fetchCategories} from "../util/api";

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

function loadCategoriesAction(categories) {
  return {
    type: LOAD_CATEGORIES,
    payload: categories
  }
}

export const loadCategoriesFetch = (dispatch)  => {
  return function () {
    fetchCategories('categories')
      .then((response) => {
        return dispatch(loadCategoriesAction(response && response.categories ? response.categories: []))
      })
  }
};
