import { actions } from '../actions/Questions';

const initialState = {
  barberShops: [],
  myBookings: [],
  chosenShop: null,
  chosenDate: null,
  isLoading: false,
};

export default function questionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.BARBER_SHOPS:
      return {
        ...state,
        barberShops: action.payload,
      };

    case actions.PUT.CHOSEN_SHOP:
      return {
        ...state,
        chosenShop: action.payload,
      };

    case actions.PUT.CHOSEN_DATE:
      return {
        ...state,
        chosenDate: action.payload,
      };

    case actions.PUT.BOOKINGS:
      return {
        ...state,
        myBookings: action.payload,
      };

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
