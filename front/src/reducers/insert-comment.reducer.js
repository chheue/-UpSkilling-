import publicationsConstants from '../constants/publications.constant';

export default function insertComment(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.ADD_COMMENT_SUCCESS:
      return {
        addComment: true,
      };
    case publicationsConstants.ADD_COMMENT_FAILURE:
      return {
        addComment: false,
      };
    default:
      return state;
  }
}
