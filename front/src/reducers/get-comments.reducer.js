import publicationsConstants from '../constants/publications.constant';

export default function getComments(state = {}, action) {
  switch (action.type) {
    case publicationsConstants.GET_COMMENTS_SUCCESS:
      return {
        comments: action.comments,
      };
    case publicationsConstants.GET_COMMENTS_FAILURE:
      return {
        comments: {},
      };
    default:
      return state;
  }
}
