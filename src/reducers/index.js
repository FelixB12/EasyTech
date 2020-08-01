import { combineReducers } from "redux";
import watchlistsReducer from "./watchlistsReducer";
import userReducer from "./userReducer";
import storage from "redux-persist/lib/storage";
/**
 * Add all Reducers here
 */
const appReducer = combineReducers({
  watchlists: watchlistsReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
