import Store from '../store/restaurants';

export const initialState = Store;

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESTAURANT_DATA': {
      // console.log("restaurantReducer listaction:", action);
      return {
        ...state,
        restaurantsList: action.data || {},
      };
    }
    default:
      return state;
  }
}
