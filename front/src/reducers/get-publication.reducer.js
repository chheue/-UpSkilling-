import publicationsConstants from '../constants/publications.constant';

export default function getPublication(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.GET_BY_ID_REQUEST:
      return {
        publicationLoading: true,
      };
    case publicationsConstants.GET_BY_ID_SUCCESS:
      return {
        publicationLoading: false,
        publicationFetched: true,
        publication: action.publication,
      };
    case publicationsConstants.GET_BY_ID_FAILURE:
      return {
        publicationLoading: false,
        publicationFetched: false,
        publication: {},
      };
    default:
      return state;
  }
}
