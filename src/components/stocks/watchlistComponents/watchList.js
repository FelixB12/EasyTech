import React, { useEffect, useState } from "react";
import stockData from "../../testData/stockData.json";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import WatchlistAddSymbol from "./WatchlistAddSymbol";
import WatchlistDeleteSymbol from "./WatchlistDeleteSymbol";
import {
  API_URL,
  GET_SINGLE_WATCHLIST,
  COMPANY_QUOTES,
} from "../../constants/constants";
const useStyles = makeStyles((theme) => ({
  priceColorGreen: {
    color: "green",
  },
  priceColorRed: {
    color: "red",
  },
}));

const deleteButtonStyle = {
  color: "red",
};

const addButtonStyle = {
  color: "green",
};

export default function WatchList(props) {
  const watchlist = props.watchlist;
  const user = props.user;
  // Remove test data
  const classes = useStyles();
  let [stockSymbolData, setStockSymbolData] = useState();

  useEffect(() => {
    // Using test data for now
    setStockSymbolData(stockData);

    const interval = setInterval(() => {
      console.log(watchlist.watchlistSymbols);
      // TODO enable after
      // axios
      //   .get(API_URL + COMPANY_QUOTES, {
      //     params: { symbols: props.watchlistSymbols },
      //   }) // TODO remove watch list id
      //   .then((result) => {
      //     console.log(result);
      //     setStockSymbolData(result.data);
      //   });
    }, 1000); // run every 1s

    return () => clearInterval(interval);
  }, [watchlist.watchlistSymbols]);

  const handleRemoveSymbol = () => {
    // TODO Handle remove, need to update db
  };

  const handleAddSymbol = () => {
    // TODO Handle add, need to update db
  };
  // TODO retrive watch list name from Database
  // TODO Make table look prettier
  // TODO Add button to add/remove symbol to the watch-list
  if (stockSymbolData != null) {
    return (
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change Percentage</TableCell>
              <TableCell>Change Points</TableCell>
              <TableCell>
                <WatchlistAddSymbol
                  watchlist={watchlist}
                  token={user.token}
                  user={user}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockSymbolData.map((row) => (
              <TableRow key={row.symbol}>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell
                  className={
                    Math.sign(row.changesPercentage) === 1
                      ? classes.priceColorGreen
                      : classes.priceColorRed
                  }
                >
                  <strong>{row.changesPercentage}%</strong>
                </TableCell>
                <TableCell>{row.change}</TableCell>
                <TableCell>
                  <WatchlistDeleteSymbol
                    symbol={row.symbol}
                    watchlist={watchlist}
                    token={user.token}
                    user={user}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        Add Symbol to Watchlist
        <IconButton size="small">
          <AddIcon
            variant="contained"
            style={addButtonStyle}
            size="small"
            onClick={handleAddSymbol}
          />
        </IconButton>
      </div>
    );
  }
}
