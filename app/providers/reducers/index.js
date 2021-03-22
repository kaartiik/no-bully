import { combineReducers } from 'redux';
import userReducer from './User';
import questionsReducer from './Questions';

export default combineReducers({
  userReducer,
  questionsReducer,
});
