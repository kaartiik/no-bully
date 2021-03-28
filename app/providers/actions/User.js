export const actions = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  LOGIN: {
    REQUEST: 'LOGIN_REQUEST',
  },
  SYNC_USER: 'SYNC_USER',
  LOGOUT: {
    REQUEST: 'LOGOUT_REQUEST',
  },
  PUT: {
    TOKEN: 'PUT_TOKEN',
    USER_PROFILE: 'PUT_USER_PROFILE',
    CURRENT_LEVEL: 'PUT_CURRENT_LEVEL',
    CURRENT_QUESTION: 'PUT_CURRENT_QUESTION',
    CURRENT_SCORE: 'PUT_CURRENT_SCORE',
    USER_RANKINGS: 'USER_RANKINGS',
  },
  RETRY_LEVEL: 'RETRY_LEVEL',
  NEXT_LEVEL: 'NEXT_LEVEL',
  SAVE_SCORE: 'SAVE_SCORE',
  NEXT_QUESTION: 'NEXT_QUESTION',
  GO_HOME: 'GO_HOME',
  GET_ACHIEVEMENTS: 'GET_ACHIEVEMENTS',
  REPLAY_GAME: 'REPLAY_GAME',
};

export const syncUser = () => ({
  type: actions.SYNC_USER,
});

export const register = (name, email, password) => ({
  type: actions.REGISTER_REQUEST,
  payload: { name, email, password },
});

export const login = ({ email, password }) => ({
  type: actions.LOGIN.REQUEST,
  email,
  password,
});

export const logout = () => ({
  type: actions.LOGOUT.REQUEST,
});

export const putUserProfile = (profile) => ({
  type: actions.PUT.USER_PROFILE,
  payload: profile,
});

export const putCurrentLevel = (level) => ({
  type: actions.PUT.CURRENT_LEVEL,
  payload: level,
});

export const putCurrentQuestion = (question) => ({
  type: actions.PUT.CURRENT_QUESTION,
  payload: question,
});

export const putCurrentScore = (currentScore, currentLevelScore) => ({
  type: actions.PUT.CURRENT_SCORE,
  payload: { currentScore, currentLevelScore },
});

export const saveScore = (answer, navigateTo) => ({
  type: actions.SAVE_SCORE,
  payload: { answer, navigateTo },
});

export const switchNextQuestion = (onSwitch) => ({
  type: actions.NEXT_QUESTION,
  payload: onSwitch,
});

export const retryLevel = () => ({
  type: actions.RETRY_LEVEL,
});

export const nextLevel = () => ({
  type: actions.NEXT_LEVEL,
});

export const goHome = () => ({
  type: actions.GO_HOME,
});

export const getAchievements = () => ({
  type: actions.GET_ACHIEVEMENTS,
});

export const putUserRankings = (rankings) => ({
  type: actions.PUT.USER_RANKINGS,
  payload: rankings,
});

export const replayGame = () => ({
  type: actions.REPLAY_GAME,
});
