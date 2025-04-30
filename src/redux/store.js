import { applyMiddleware, createStore } from "redux";
const initialState = {
  allCountries: [],
  loginData: [],
  profilePic: null,
  dirProfileData: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
      };
    case "SET_LOGIN_DATA":
      return {
        ...state,
        loginData: action.payload,
      };
    case "SET_DIR_PROFILE_DATA":
      return {
        ...state,
        dirProfileData: action.payload,
      };

    default:
      return state;
  }
};
const store = createStore(authReducer);

export { store };
