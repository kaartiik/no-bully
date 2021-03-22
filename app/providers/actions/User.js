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
  },
  RETRY_LEVEL: 'RETRY_LEVEL',
  NEXT_LEVEL: 'NEXT_LEVEL',
  ADD_CURRENT_SCORE: 'ADD_CURRENT_SCORE',
  NEXT_QUESTION: 'NEXT_QUESTION',
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

export const addCurrentScore = () => ({
  type: actions.ADD_CURRENT_SCORE,
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
