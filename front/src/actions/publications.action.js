import publicationsService from '../services/publications.service';
import publicationsConstants from '../constants/publications.constant';

function insert(title, content, author, creationDate) {
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
    publicationsService.insert({
      title, content, author, creationDate,
    }).then(() => {
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

  function success() {
    return { type: publicationsConstants.GET_BY_ID_SUCCESS };
  }

  function failure(error) {
    return { type: publicationsConstants.GET_BY_ID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    publicationsService.getId(id).then((publication) => {
      dispatch(success(publication));
    }, (error) => {
      dispatch(failure(error.toString()));
      alert(error.toString());
    });
  };
}

export default {
  insert,
  getAll,
  getById,
};
