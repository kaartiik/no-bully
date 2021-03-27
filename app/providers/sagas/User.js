/* eslint-disable no-console */
import { Platform } from 'react-native';
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select,
  take,
  fork,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { navigate, reset } from '../services/NavigatorService';
import rsf, { auth, database } from '../../providers/config';
import {
  actions,
  putUserProfile,
  putToken,
  putLoadingStatus,
  putChats,
  putUserChats,
  putCurrentLevel,
  putCurrentQuestion,
  putCurrentScore,
} from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const getCurrentQuestionFromState = (state) =>
  state.userReducer.currentQuestion;
const getCurrentLevelFromState = (state) => state.userReducer.level;
const getCurrentScoreFromState = (state) => state.userReducer.currentScore;
const getCurrentLevelScoreFromState = (state) =>
  state.userReducer.currentLevelScore;
const getLastLevelScoreFromState = (state) => state.userReducer.lastLevelScore;

const getUuidFromState = (state) => state.userReducer.uuid;
const getNameFromState = (state) => state.userReducer.name;

const loginRequest = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

const logoutRequest = () => auth.signOut();

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

const getUserProfile = (uid) =>
  database
    .ref('users')
    .child(uid)
    .once('value')
    .then((snapshot) => ({ dbUser: snapshot.val() }))
    .catch((error) => ({ error }));

function* syncUserSaga() {
  const user = yield call(onAuthStateChanged);

  if (user) {
    const { dbUser } = yield call(getUserProfile, user.uid);

    if (dbUser !== null && dbUser !== undefined) {
      yield put(putUserProfile(dbUser));

      setTimeout(() => {
        reset('AppStack');
      }, 100);
    }
  } else {
    setTimeout(() => {
      reset('AuthStack');
    }, 100);
  }
}

function* loginSaga({ email, password }) {
  try {
    yield call(loginRequest, { email, password });
  } catch (error) {
    alert(error);
    return;
  }
  yield call(syncUserSaga);
}

function* registerSaga({ payload }) {
  const { name, email, password } = payload;

  try {
    const { user } = yield call(
      rsf.auth.createUserWithEmailAndPassword,
      email,
      password
    );

    yield call(rsf.database.update, `users/${user.uid}`, {
      name,
      email,
      password,
      level: 'L1',
      currentQuestion: 'Q1',
      currentScore: 0,
      currentLevelScore: 0,
      uuid: user.uid,
    });

    yield call(syncUserSaga);
  } catch (error) {
    alert(error);
    return;
  }
}

function* logoutSaga() {
  try {
    yield call(logoutRequest);
  } catch (error) {
    alert('Error!');
    return;
  }
  yield call(syncUserSaga);
}

// function* saveScore({ key, score }) {
//   const userId = yield select(getUuidFromState);

//   try {
//     yield call(rsf.database.update, `users/${userId}/${key}`, score);
//   } catch (error) {
//     alert(error);
//     return;
//   }
// }

function* saveScoreSaga({ payload }) {
  const { answer, navigateTo } = payload;
  const userId = yield select(getUuidFromState);
  const currentScore = yield select(getCurrentScoreFromState);
  const currentLevelScore = yield select(getCurrentLevelScoreFromState);

  const currentQuestionStr = yield select(getCurrentQuestionFromState);
  const currentQuestion = parseInt(currentQuestionStr.substring(1));
  const newQuestion = currentQuestion + 1;

  try {
    if (answer === 'CORRECT') {
      const newCurrentScore = currentScore + 1;
      const newCurrentLevelScore = currentLevelScore + 1;

      yield put(putCurrentScore(newCurrentScore, newCurrentLevelScore));

      yield call(rsf.database.patch, `users/${userId}`, {
        currentScore: newCurrentScore,
        currentLevelScore: newCurrentLevelScore,
      });
    }

    if (newQuestion !== 6) {
      yield call(rsf.database.patch, `users/${userId}`, {
        currentQuestion: `Q${newQuestion}`,
      });
    }

    navigateTo();
  } catch (error) {
    alert(error);
    return;
  }
}

function* nextQuestionSaga({ payload }) {
  const onSwitch = payload;
  const currentQuestionStr = yield select(getCurrentQuestionFromState);
  const currentLevelStr = yield select(getCurrentLevelFromState);
  const currentScore = yield select(getCurrentScoreFromState);

  const currentQuestion = parseInt(currentQuestionStr.substring(1));

  switch (currentLevelStr) {
    case 'L1': {
      if (currentQuestion !== 5) {
        const newQuestion = currentQuestion + 1;
        yield put(putCurrentQuestion(`Q${newQuestion}`));

        onSwitch();
      } else if (currentQuestion === 5 && currentScore > 3) {
        reset('LevelCompleteScreen');
      } else {
        reset('LevelCompleteScreen');
      }
      break;
    }
    case 'L2': {
      if (currentQuestion !== 5) {
        const newQuestion = currentQuestion + 1;
        yield put(putCurrentQuestion(`Q${newQuestion}`));

        onSwitch();
      } else if (currentQuestion === 5 && currentScore > 3) {
        reset('LevelCompleteScreen');
      } else {
        reset('LevelCompleteScreen');
      }
      break;
    }
    case 'L3': {
      if (currentQuestion !== 5) {
        const newQuestion = currentQuestion + 1;
        yield put(putCurrentQuestion(`Q${newQuestion}`));

        onSwitch();
      } else if (currentQuestion === 5 && currentScore > 3) {
        reset('LevelCompleteScreen');
      } else {
        reset('LevelCompleteScreen');
      }
      break;
    }
    case 'L4': {
      if (currentQuestion !== 5) {
        const newQuestion = currentQuestion + 1;
        yield put(putCurrentQuestion(`Q${newQuestion}`));

        onSwitch();
      } else if (currentQuestion === 5 && currentScore > 3) {
        reset('LevelCompleteScreen');
      } else {
        reset('LevelCompleteScreen');
      }
      break;
    }
  }
}

function* retryLevelSaga() {
  try {
    const userId = yield select(getUuidFromState);
    const currentScore = yield select(getCurrentScoreFromState);
    const currentLevelScore = yield select(getCurrentLevelScoreFromState);

    const newCurrentScore = currentScore - currentLevelScore;

    yield put(putCurrentScore(newCurrentScore, 0));

    yield put(putCurrentQuestion(`Q1`));

    yield call(rsf.database.patch, `users/${userId}`, {
      currentQuestion: 'Q1',
      currentScore: newCurrentScore,
      currentLevelScore: 0,
    });

    reset('Questions');
  } catch (error) {
    alert(error);
    return;
  }
}

function* nextLevelSaga() {
  try {
    const userId = yield select(getUuidFromState);
    const currentLevelStr = yield select(getCurrentLevelFromState);
    const currentLevel = parseInt(currentLevelStr.substring(1));
    const newLevel = currentLevel + 1;

    const currentScore = yield select(getCurrentScoreFromState);

    yield put(putCurrentScore(currentScore, 0));

    yield put(putCurrentLevel(`L${newLevel}`));
    yield put(putCurrentQuestion(`Q1`));

    yield call(rsf.database.patch, `users/${userId}`, {
      level: `L${newLevel}`,
      currentQuestion: 'Q1',
      currentLevelScore: 0,
    });

    reset('Questions');
  } catch (error) {
    alert(error);
    return;
  }
}

function* goHomeSaga() {
  reset('Home');
}

export default function* User() {
  yield all([
    takeLatest(actions.REGISTER_REQUEST, registerSaga),
    takeLatest(actions.REGISTER_REQUEST, registerSaga),
    takeLatest(actions.LOGIN.REQUEST, loginSaga),
    takeLatest(actions.LOGOUT.REQUEST, logoutSaga),
    takeLatest(actions.NEXT_QUESTION, nextQuestionSaga),
    takeLatest(actions.RETRY_LEVEL, retryLevelSaga),
    takeLatest(actions.NEXT_LEVEL, nextLevelSaga),
    takeLatest(actions.SAVE_SCORE, saveScoreSaga),
    takeLatest(actions.GO_HOME, goHomeSaga),
    takeEvery(actions.SYNC_USER, syncUserSaga),
  ]);
}
