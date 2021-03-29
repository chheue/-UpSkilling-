import publicationsService from '../services/publications.service';
import publicationsConstants from '../constants/publications.constant';

function insertPublication(values) {
  function request() {
    return { type: publicationsConstants.INSERT_REQUEST };
  }

  function success() {
    return { type: publicationsConstants.INSERT_SUCCESS };
  }

  function failure(error) {
    return { type: publicationsConstants.INSERT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    publicationsService.insertPublication(values).then(() => {
      dispatch(success());
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function getAll() {
  function request() {
    return { type: publicationsConstants.GET_ALL_REQUEST };
  }

  function success(publications) {
    return { type: publicationsConstants.GET_ALL_SUCCESS, publications };
  }

  function failure(error) {
    return { type: publicationsConstants.GET_ALL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    publicationsService.getAll().then((publications) => {
      dispatch(success(publications));
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function getById(id) {
  function request(reqId) {
    return { type: publicationsConstants.GET_BY_ID_REQUEST, reqId };
  }

  function success(publication) {
    return { type: publicationsConstants.GET_BY_ID_SUCCESS, publication };
  }

  function failure(error) {
    return { type: publicationsConstants.GET_BY_ID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    publicationsService.getById(id).then((publication) => {
      dispatch(success(publication));
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function commentPublication(values, id) {
  function success() {
    return { type: publicationsConstants.ADD_COMMENT_SUCCESS };
  }

  function failure(error) {
    return { type: publicationsConstants.ADD_COMMENT_FAILURE, error };
  }

  return (dispatch) => {
    publicationsService.commentPublication(
      values, id,
    ).then(() => {
      dispatch(success());
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function getComments(id) {
  function success(comments) {
    return { type: publicationsConstants.GET_COMMENTS_SUCCESS, comments };
  }

  function failure(error) {
    return { type: publicationsConstants.GET_COMMENTS_FAILURE, error };
  }

  return (dispatch) => {
    publicationsService.getComments(id).then((comments) => {
      dispatch(success(comments));
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function searchPublication(title) {
  function success(items) {
    return { type: publicationsConstants.SEARCH_SUCCESS, items };
  }

  function failure(error) {
    return { type: publicationsConstants.SEARCH_FAILURE, error };
  }

  return (dispatch) => {
    publicationsService.searchPublication(title).then((items) => {
      dispatch(success(items));
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

function deletePublication(id) {
  function request() {
    return { type: publicationsConstants.DELETE_PUBLICATION_REQUEST };
  }

  function success() {
    return { type: publicationsConstants.DELETE_PUBLICATION_SUCCESS };
  }

  function failure(error) {
    return { type: publicationsConstants.DELETE_PUBLICATION_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    publicationsService.deletePublication(id).then(() => {
      dispatch(success());
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

export default {
  insertPublication,
  getAll,
  getById,
  commentPublication,
  getComments,
  searchPublication,
  deletePublication,
};
