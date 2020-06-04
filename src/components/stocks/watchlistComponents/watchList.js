import React, { useEffect, useState } from "react";
import stockData from "../../testData/stockData.json";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
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

export default function WatchList(props) {
  // Remove test data
  const classes = useStyles();
  let [stockSymbolData, setStockSymbolData] = useState();

  useEffect(() => {
    // Using test data for now
    setStockSymbolData(stockData);

    const interval = setInterval(() => {
      console.log(props.watchlistSymbols);
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
  }, [props.watchlistSymbols]);

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  } else {
    return <div>Not Loaded</div>;
  }
}
