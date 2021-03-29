import publicationsConstants from '../constants/publications.constant';

export default function deletePublication(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.DELETE_PUBLICATION_REQUEST:
      return {
        deleteLoading: true,
      };
    case publicationsConstants.DELETE_PUBLICATION_SUCCESS:
      return {
        publicationDeleted: true,
      };
    case publicationsConstants.DELETE_PUBLICATION_FAILURE:
      return {
        publicationDeleted: false,
      };
    default:
      return state;
  }
}
