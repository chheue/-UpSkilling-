import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import insertPublication from '../reducers/insert-publications.reducer';
import getAllPublications from '../reducers/get-all-publications.reducer';
import getPublication from '../reducers/get-publication.reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  insertPublication,
  getAllPublications,
  getPublication,
});

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
);
