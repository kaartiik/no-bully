import { actions } from '../actions/User';

const initialState = {
  name: '',
  email: '',
  level: 'L1',
  currentQuestion: 'Q1',
  uuid: '',
  token: '',
  currentScore: 0,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_PROFILE: {
      const { uuid, name, email, level } = action.payload;
      return {
        ...state,
        uuid,
        name,
        email,
        level,
      };
    }
    case actions.ADD_CURRENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + 1,
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

    default:
      return state;
  }
}
