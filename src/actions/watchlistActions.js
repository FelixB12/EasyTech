import axios from "axios";
import {
  GET_WATCHLISTS,
  CREATE_WATCHLIST,
  DELETE_WATCHLIST,
  WATCHLISTS_LOADING,
} from "./constants";
import {
  API_URL,
  GET_SINGLE_WATCHLIST,
  WATCHLIST_CREATE,
  COMPANY_QUOTES,
  WATCHLIST_DELETE,
} from "../components/constants/constants";

export const getWatchlists = () => (dispatch) => {
  dispatch(setWatchlistsLoading());
  axios
    // .get(API_URL + GET_SINGLE_WATCHLIST + "5ec9d7cd7aab3e29ccfc8746") // TODO remove watch list id, change to get all from user
    .get(API_URL + "watchlist/getWatchlists")
    .then((result) => {
      dispatch({
        type: GET_WATCHLISTS,
        payload: result.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteWatchlist = (watchlistId) => (dispatch) => {
  axios
    .delete(API_URL + WATCHLIST_DELETE + watchlistId)
    .then((res) => {
      dispatch({
        type: DELETE_WATCHLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch(getWatchlists());
};

export const createWatchlist = (watchListName) => (dispatch) => {
  axios
    .post(API_URL + WATCHLIST_CREATE, {
      watchlistName: watchListName,
      // TODO Add to what user to save
    })
    .then((res) => {
      dispatch({
        type: CREATE_WATCHLIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      // TODO let user know failed to save
    });
  dispatch(getWatchlists());
};

export const setWatchlistsLoading = () => {
  return {
    type: WATCHLISTS_LOADING,
  };
};
