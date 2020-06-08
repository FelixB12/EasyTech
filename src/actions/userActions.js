import { LOGIN, LOGOUT } from "./constants";
import axios from "axios";
import {
  API_URL,
  USER_AUTH,
  USER_REGISER,
} from "../components/constants/constants";

export const authenticateUser = (user, token, loggedIn) => (dispatch) => {
  dispatch({
    type: LOGIN,
    user: user,
    token: token,
    loggedIn: loggedIn,
  });
};
