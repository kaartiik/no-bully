import { actions } from '../actions/User';

const initialState = {
  name: '',
  email: '',
  level: 'L1',
  currentQuestion: 'Q1',
  uuid: '',
  currentScore: 0,
  currentLevelScore: 0,
  userRankings: [],
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_PROFILE: {
      const {
        name,
        email,
        level,
        currentQuestion,
        currentScore,
        currentLevelScore,
        uuid,
      } = action.payload;
      return {
        ...state,
        name,
        email,
        level,
        currentQuestion,
        currentScore,
        currentLevelScore,
        uuid,
      };
    }
    case actions.PUT.CURRENT_SCORE:
      const { currentScore, currentLevelScore } = action.payload;
      return {
        ...state,
        currentScore,
        currentLevelScore,
      };

    case actions.PUT.CURRENT_LEVEL:
      return {
        ...state,
        level: action.payload,
      };

    case actions.PUT.CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };

    case actions.PUT.USER_RANKINGS:
      return {
        ...state,
        userRankings: action.payload,
      };

    default:
      return state;
  }
}
