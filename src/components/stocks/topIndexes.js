import React, { useEffect, useState } from "react";
import StockPrice from "./watchlistComponents/stockPrice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { API_URL, STOCKS_MULTIPLE_SYMBOLS } from "./../constants/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function TopIndexes() {
  const classes = useStyles();

  let [stocks, setStocks] = useState();

  useEffect(() => {
    axios
      .get(API_URL + STOCKS_MULTIPLE_SYMBOLS + "AAPL&symbols=GOOG&symbols=MSFT")
      .then((res) => {
        const data = res.data.companiesPriceList;
        console.log(res);
        setStocks(data);
      });
  });

  if (stocks) {
    return (
      <div className={classes.root}>
        {console.log(stocks)}
        <Grid container spacing={1}>
          {Object.keys(stocks).map((key, i) => (
            <Grid item xs={2}>
              <StockPrice
                symbol={stocks[key].symbol}
                price={stocks[key].price}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else {
    return <div></div>;
  }
}
