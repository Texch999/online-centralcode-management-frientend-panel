import { applyMiddleware, createStore } from "redux";
const initialState = {
  allCountries: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      };

    default:
      return state;
  }
};
const store = createStore(authReducer);

export { store };
