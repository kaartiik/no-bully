import { all } from 'redux-saga/effects';
import User from './User';
import Questions from './Questions';

export default function* rootSaga() {
  yield all([User(), Questions()]);
}
