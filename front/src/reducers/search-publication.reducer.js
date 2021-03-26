import publicationsConstants from '../constants/publications.constant';

export default function searchPublication(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.SEARCH_SUCCESS:
      return {
        search: true,
        searchItems: action.items,
      };
    case publicationsConstants.SEARCH_FAILURE:
      return {
        search: false,
        searchItems: {},
      };
    default:
      return state;
  }
}
