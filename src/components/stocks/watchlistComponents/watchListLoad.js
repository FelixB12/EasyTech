import React, { useEffect } from "react";
import WatchListCreateNew from "./WatchListCreateNew";
import WatchlistDelete from "./WatchlistDelete";
import WatchList from "./watchList";
import Title from "../../common/Title";
import { useSelector, useDispatch } from "react-redux";
import { getWatchlists } from "../../../actions/watchlistActions";

const WatchListLoad = () => {
  const watchlistsData = useSelector((state) => state.watchlists); // TODO "watchlists" on the last line here is it correct in json?
  const user = useSelector((state) => state.user);
  const refreshWatchlist = useSelector((state) => state.watchlists.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    // Refresh watchlist data
    dispatch(getWatchlists(user.token));
    console.log("getWatchlists called");
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
            <WatchlistDelete
              watchlist={watchList}
              token={user.token}
              user={user}
            />
            <Title>{watchList.watchlistName}</Title>
            <WatchList watchlistSymbols={watchList.watchlistSymbols} />
            <br />
          </div>
        ))}
      </div>
    );
  else return <div> Sign In to create a watchlist</div>;
};

// TODO *** get rid of the connect(and props) and use the new way of connecting redux store with hooks ***

export default WatchListLoad;
