import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
import userReducer from "./userReducer";
/**
 * Add all Reducers here
 */
const rootReducer = combineReducers({
  watchlists: watchlistsReducer,
  user: userReducer,
});

export default rootReducer;
