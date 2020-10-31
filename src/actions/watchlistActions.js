import axios from "axios";
import {
  GET_WATCHLISTS,
  CREATE_WATCHLIST,
  DELETE_WATCHLIST,
  WATCHLISTS_LOADING,
  LOGOUT,
} from "./constants";
import {
  API_URL,
  WATCHLIST_CREATE,
  WATCHLIST_DELETE,
  ADD_SYMBOL,
} from "../components/constants/constants";

export const getWatchlists = (token) => (dispatch) => {
  dispatch(setWatchlistsLoading());

  const configBearer = { headers: { Authorization: "Bearer " + token } };

  axios
    // .get(API_URL + GET_SINGLE_WATCHLIST + "5ec9d7cd7aab3e29ccfc8746") // TODO remove watch list id, change to get all from user
    .get(API_URL + "watchlist/getWatchlists", configBearer)
    .then((result) => {
      dispatch({
        type: GET_WATCHLISTS,
        payload: result.data,
      });
    })
    .catch((err) => {
      // TODO Check if the User was actually authenticated by the server, if not logout

      console.log(err);
    });
};

export const deleteWatchlist = (watchlistId, token, userId) => (dispatch) => {
  const configBearer = { headers: { Authorization: "Bearer " + token } };

  axios
    .delete(
      API_URL + WATCHLIST_DELETE + watchlistId + "&userId=" + userId,
      configBearer
    )
    .then((res) => {
      dispatch({
        type: DELETE_WATCHLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //dispatch(getWatchlists(token)); // TODO include token
};

export const createWatchlist = (watchListName, user) => (dispatch) => {
  console.log(user);

  const configBearer = {
    headers: { Authorization: "Bearer " + user.user.token },
  };

  axios
    .post(
      API_URL + WATCHLIST_CREATE,
      {
        watchlistName: watchListName,
        userId: user.user.userData.id,

        // TODO Add to what user to save
      },
      configBearer
    )
    .then((res) => {
      dispatch({
        type: CREATE_WATCHLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.status === 401) {
        // Unauthorized
        // Logout the user
        dispatch({ type: LOGOUT });
      }
    });
  //dispatch(getWatchlists(user.user.token));
};

export const setWatchlistsLoading = () => {
  return {
    type: WATCHLISTS_LOADING,
  };
};

export const addSymbol = (watchlistId, watchlistSymbol, token) => (
  dispatch
) => {
  const configBearer = {
    headers: { Authorization: "Bearer " + token },
  };
  // User exists
  axios
    .patch(
      API_URL + ADD_SYMBOL,
      {
        id: watchlistId,
        watchlistSymbol: watchlistSymbol,
      },
      configBearer
    )
    .then((res) => {
      dispatch(getWatchlists(token));
    })
    .catch();
};
