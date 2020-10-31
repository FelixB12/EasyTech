import React, { useEffect } from "react";
import WatchListCreateNew from "./WatchlistCreateNew";
import WatchList from "./Watchlist";
import { useSelector, useDispatch } from "react-redux";
import { getWatchlists } from "../../../actions/WatchlistActions";
import WatchListActions from "./WatchlistActions";

const WatchListLoad = () => {
  const watchlistsData = useSelector((state) => state.watchlists); // TODO "watchlists" on the last line here is it correct in json?
  const user = useSelector((state) => state.user);
  const refreshWatchlist = useSelector((state) => state.watchlists.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    // Refresh watchlist data
    dispatch(getWatchlists(user.token));
  }, [refreshWatchlist, user.token, dispatch]);

  if (
    watchlistsData.watchlists &&
    user.loggedIn &&
    watchlistsData.loading === false
  )
    return (
      <div>
        <WatchListCreateNew user={user} />
        {console.log(watchlistsData.watchlists)}
        {watchlistsData.watchlists.map((watchList) => (
          <div>
            <WatchListActions
              watchlist={watchList}
              token={user.token}
              user={user}
            />
            <WatchList watchlist={watchList} user={user} />
            <br />
          </div>
        ))}
      </div>
    );
  else if (user.loggedIn && watchlistsData.loading === true)
    return <div>Watchlist loading...</div>;
  else return <div> Sign In to create a watchlist</div>;
};

// TODO *** get rid of the connect(and props) and use the new way of connecting redux store with hooks ***

export default WatchListLoad;
