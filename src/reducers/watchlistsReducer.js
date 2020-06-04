import {
  GET_WATCHLISTS,
  CREATE_WATCHLIST,
  DELETE_WATCHLIST,
  WATCHLISTS_LOADING,
} from "./../actions/constants";
import watchlistData from "../components/testData/watchlistData.json";
const initalState = {
  //watchlists: watchlistData,
  watchlists: [],
  loading: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_WATCHLISTS:
      return {
        ...state,
        watchlists: action.payload,
        loading: false,
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
      };
    case CREATE_WATCHLIST:
      return {
        ...state,
      };
    case WATCHLISTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state; // TODO Change the inital sate to soemthing else
  }
}
