import {
  GET_WATCHLISTS,
  CREATE_WATCHLIST,
  DELETE_WATCHLIST,
  WATCHLISTS_LOADING,
} from "../actions/constants";
import watchlistData from "../components/testData/watchlistData.json";
const initalState = {
  //watchlists: watchlistData,
  watchlists: [],
  info: {},
  loading: false,
  refresh: true,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_WATCHLISTS:
      return {
        ...state,
        watchlists: action.payload.watchlists,
        info: action.payload.info,
        loading: false,
        refresh: false,
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        refresh: true,
      };
    case CREATE_WATCHLIST:
      return {
        ...state,
        refresh: true,
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
