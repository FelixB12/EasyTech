const express = require("express");
const router = express.Router();
const getStocks = require("../stockApiCalls/retrieveStocks");

// TODO what are the appropiate status reponses for http

/**
 * Individual Stock symbol
 */
router.get("/singleStock/:symbol", (req, res, next) => {
  const symbol = req.params.symbol;
  getStocks
    .getCurrentStockPrice(symbol)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * Multiple Stocks at once
 * Send request as "?symbols=AAPL&symbols=GOOG" etc
 */
router.get("/multipleStocks/", (req, res, next) => {
  const symbols = Array.from(req.query.symbols);
  console.log(symbols);
  getStocks
    .getBatchSymbols(symbols)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * TODO This GET will take to long
 */
// router.get("/symbollist", (req, res, next) => {
//   getStocks
//     .getSymbolList()
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

/**
 * Individual Stock symbol with history
 * TODO add req body with time frame, 1min, 5min, 15min, 1hr, Daily
 * Last 24hrs, takes long to load
 */
router.get("/singleStockHistoryOneMinute/:symbol", (req, res, next) => {
  const symbol = req.params.symbol;
  getStocks
    .getHistoricalStockPricesOneMinute(symbol)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/companyQuote/", (req, res, next) => {
  const symbols = Array.from(req.query.symbols);
  getStocks
    .getCompanyQuotes(symbols)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
