import React, { useEffect, useState } from "react";
import stockData from "../../testData/stockData.json";
import WatchListCreateNew from "./WatchListCreateNew";
import WatchlistDelete from "./WatchlistDelete";
import WatchList from "./watchList";
import Title from "../../common/Title";
import axios from "axios";
import {
  API_URL,
  GET_SINGLE_WATCHLIST,
  COMPANY_QUOTES,
} from "../../constants/constants";
import { getWatchlists } from "./../../../actions/watchlistActions";
import { useSelector, useDispatch } from "react-redux";

const WatchListLoad = () => {
  const testDataStock = stockData;
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlists.watchlists); // TODO "watchlists" on the last line here is it correct in json?
  console.log(watchlists);
  //const testDataWatchList = watchlistData;
  //let [watchlist, setWatchlist] = useState();
  // let [stockData, setStockData] = useState();
  useEffect(() => {
    // TODO Enable and change to use Redux to use the dispatch to update if new watchlsits are available
    // const interval = setInterval(() => {
    //   axios
    //     .get(API_URL + GET_SINGLE_WATCHLIST + "5ec9d7cd7aab3e29ccfc8746") // TODO remove watch list id
    //     .then((result) => {
    //       console.log(result);
    //       setWatchlist(result.data);
    //     });
    // }, 500); // run every 0.5s
    // return () => clearInterval(interval);
    // TODO remove after. Get Watchlists data
    // setWatchlist(watchlists);
    // console.log("loading watchlist");
    // console.log(watchlist);
    dispatch(getWatchlists()); // Update the watchlits
  }, []); // Change [] to include when ever watchlist is updated, after Create/delete?

  // TODO add "My List" ?
  if (watchlists != null)
    return (
      <div>
        <WatchListCreateNew />

        {watchlists.map((watchList) => (
          <div>
            <WatchlistDelete watchlist={watchList} />
            <Title>{watchList.watchlistName}</Title>
            <WatchList watchlistSymbols={watchList.watchlistSymbols} />
            <br />
          </div>
        ))}
      </div>
    );
  else return <div>Nothing Loaded</div>;
};

// TODO *** get rid of the connect(and props) and use the new way of connecting redux store with hooks ***

export default WatchListLoad;
