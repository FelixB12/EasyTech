import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
/**
 * Add all Reducers here
 */
const rootReducer = combineReducers({
  watchlists: watchlistsReducer,
});

export default rootReducer;
