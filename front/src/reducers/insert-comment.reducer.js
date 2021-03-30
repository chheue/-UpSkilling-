import publicationsConstants from '../constants/publications.constant';

export default function insertComment(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.ADD_COMMENT_REQUEST:
      return {
        addCommentLoading: true,
      };
    case publicationsConstants.ADD_COMMENT_SUCCESS:
      return {
        addCommentLoading: false,
        addComment: true,
      };
    case publicationsConstants.ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addComment: false,
      };
    default:
      return state;
  }
}
