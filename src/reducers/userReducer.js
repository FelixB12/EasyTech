import { LOGIN, LOGOUT } from "../actions/constants";

const initalState = {
  userData: {},
  token: "",
  loggedIn: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.user,
        token: action.token,
        loggedIn: action.loggedIn,
      };
    default:
      return state;
  }
}
