import React, { useEffect, useState } from "react";
import StockPrice from "./watchlistComponents/StockPrice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { API_URL, STOCKS_MULTIPLE_SYMBOLS } from "../constants/constants";
import testdata from "../testData/topIndexesTestData.json";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function TopIndexes() {
  const classes = useStyles();
  let [stocks, setStocks] = useState();

  useEffect(() => {
    setStocks(testdata);
  }, [1]);

  if (stocks) {
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
          wrap="nowrap"
        >
          {Object.keys(stocks).map((key, i) => (
            <div>
              <Grid item xs={12}>
                <StockPrice
                  symbol={stocks[key].symbol}
                  price={stocks[key].price}
                  change={stocks[key].change}
                  changesPercentage={stocks[key].changesPercentage}
                />
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    );
  } else {
    return <div></div>; // TODO show Loading
  }
}
