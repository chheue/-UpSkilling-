import publicationsConstants from '../constants/publications.constant';

export default function insertPublications(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.INSERT_REQUEST:
      return {
        insertLoading: true,
      };
    case publicationsConstants.INSERT_SUCCESS:
      return {
        insertLoading: false,
        insertPublication: true,
      };
    case publicationsConstants.INSERT_FAILURE:
      return {
        insertLoading: false,
        insertPublication: false,
      };
    default:
      return state;
  }
}
