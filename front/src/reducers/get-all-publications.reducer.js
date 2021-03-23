import publicationsConstants from '../constants/publications.constant';

export default function getAllPublications(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.GET_ALL_REQUEST:
      return {
        publicationsLoading: true,
      };
    case publicationsConstants.GET_ALL_SUCCESS:
      return {
        publicationsLoading: false,
        publicationsFetched: true,
        publications: action.publications,
      };
    case publicationsConstants.GET_ALL_FAILURE:
      return {
        publicationsLoading: false,
        publicationsFetched: false,
        publications: {},
      };
    default:
      return state;
  }
}
