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
} from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const getCurrentQuestionFromState = (state) =>
  state.userReducer.currentQuestion;
const getCurrentLevelFromState = (state) => state.userReducer.level;
const getCurrentScorelFromState = (state) => state.userReducer.currentScore;

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

function* getExpoToken() {
  try {
    console.log('## get expo token');
    const { status: existingStatus } = yield call(
      Permissions.getAsync,
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      console.log('## get expo token: not granted');
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = yield call(
        Permissions.askAsync,
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      console.log('## get expo token: still not granted');
      return { token: '' };
    }

    // Get the token that uniquely identifies this device
    console.log('## get expo token!!');

    const token = yield call(Notifications.getExpoPushTokenAsync);
    console.log(`Expo Push Token:${token}`);

    console.log(`Successfully uploaded expo token`);

    return {
      token,
    };
  } catch (error) {
    console.log(`Error uploading expo token: ${error}`);
    return { token: '' };
  }
}

function* syncUserSaga() {
  const user = yield call(onAuthStateChanged);

  if (user) {
    // const { token: pushToken } = yield call(getExpoToken);

    // yield call(rsf.database.update, `users/${user.uid}/token`, pushToken.data);

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

    // const { token: pushToken } = yield call(getExpoToken);

    yield call(rsf.database.update, `users/${user.uid}`, {
      name,
      email,
      password,
      level: 'L1',
      uuid: user.uid,
      // token: pushToken.data,
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

function* nextQuestionSaga({ payload }) {
  const onSwitch = payload;
  const currentQuestionStr = yield select(getCurrentQuestionFromState);
  const currentLevelStr = yield select(getCurrentLevelFromState);
  const currentScore = yield select(getCurrentScorelFromState);

  const currentQuestion = parseInt(currentQuestionStr.substring(1));
  const currentLevel = parseInt(currentLevelStr.substring(1));

  switch (currentLevelStr) {
    case 'L1': {
      if (currentQuestion !== 5) {
        const newQuestion = currentQuestion + 1;
        yield put(putCurrentQuestion(`Q${newQuestion}`));

        onSwitch();
      } else if (currentQuestion === 5 && currentScore > 3) {
        // const newLevel = currentLevel + 1;

        // yield put(putCurrentLevel(`L${newLevel}`));
        // yield put(currentQuestion(`Q1`));

        console.log(`complete level!`);

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
        const newLevel = currentLevel + 1;

        yield put(putCurrentLevel(`L${newLevel}`));
        yield put(currentQuestion(`Q1`));

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
        const newLevel = currentLevel + 1;

        yield put(putCurrentLevel(`L${newLevel}`));
        yield put(currentQuestion(`Q1`));

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
        const newLevel = currentLevel + 1;

        yield put(putCurrentLevel(`L${newLevel}`));
        yield put(currentQuestion(`Q1`));

        reset('LevelCompleteScreen');
      } else {
        reset('LevelCompleteScreen');
      }
      break;
    }
  }
}

function* retryLevelSaga() {
  const currentLevelStr = yield select(getCurrentLevelFromState);

  yield put(putCurrentLevel(currentLevelStr));
  yield put(putCurrentQuestion(`Q1`));

  reset('Questions');
}

function* nextLevelSaga() {
  const currentLevelStr = yield select(getCurrentLevelFromState);
  const currentLevel = parseInt(currentLevelStr.substring(1));
  const newLevel = currentLevel + 1;

  yield put(putCurrentLevel(`L${newLevel}`));
  yield put(putCurrentQuestion(`Q1`));

  reset('Questions');
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
    takeEvery(actions.SYNC_USER, syncUserSaga),
  ]);
}
