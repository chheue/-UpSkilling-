import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import insertPublication from '../reducers/insert-publications.reducer';
import getAllPublications from '../reducers/get-all-publications.reducer';
import getPublication from '../reducers/get-publication.reducer';
import insertComment from '../reducers/insert-comment.reducer';
import getComments from '../reducers/get-comments.reducer';
import searchPublication from '../reducers/search-publication.reducer';
import deletePublication from '../reducers/delete-publication.reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  insertPublication,
  getAllPublications,
  getPublication,
  insertComment,
  getComments,
  searchPublication,
  deletePublication,
});

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);
