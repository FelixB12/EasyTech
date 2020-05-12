const axios = require("axios");

// Move all this constants into a object or const file
//  TODO Change all consts to upercase
const API_URL = "https://financialmodelingprep.com";
const API_VER = "/api/v3/";
const COMPANY_STOCKS = "stock/";
const REAL_TIME_DATA_API = "real-time-price/";
const HISTORICAL_CHART = "historical-chart/";
const HISTORICAL_PRICE_FULL = "historical-price-full/";
const ONE_MINUTE = "1min/";
const QUOTE = "quote/";

const STOCK_LIST = "list";
const TIME_SERIES = "?timeseries=";
const FROM = "?from=";
const TO = "&to=";

/**
 * * Once go live use "https://fmpcloud.io/" with API key
 *
 *
 *
 *  TODO:
 *  Add Most Gainers stock/gainers
 *  Add Most Active  stock/actives
 *  Add Most Loser   stock/losers
 *  Add Trading hours api/v3/is-the-market-open
 *  Add Sector Performance stock/sectors-performance
 *  Add Crypto Currency /quote/ (Already Capable)
 *  Add Forx (Currency) use /quote/
 *
 *
 *
 *
 *
 */

// Functions for calling the FinancialModelingPrep API to get Stock data information
var financialModelingPrep = {
  /**
   * Real Time
   * Current Stock Pirce
   * JSON -> symbol, price
   */
  getCurrentStockPrice: (symbol) => {
    return axios.get(API_URL + API_VER + REAL_TIME_DATA_API + symbol);
  },
  /**
   * @param Symbols List ex(AAPL,MSFT)
   *
   * Real Time
   * Current Company quote and ETFS
   *
   * JSON -> symbol, name, price, changesPercentage, change(Points), etc
   */
  getCompanyQuotes: (symbols) => {
    return axios.get(API_URL + API_VER + QUOTE + symbols);
  },
  /**
   * Real Time
   * Current Stock Pirce as Batch
   * JSON -> symbol, price
   */
  getBatchSymbols: (symbols) => {
    //const symList = symbols.join(",");
    return axios.get(
      API_URL + API_VER + COMPANY_STOCKS + REAL_TIME_DATA_API + symbols
    );
  },
  /**
   * All available Symbols
   */
  getSymbolList: () => {
    return axios.get(API_URL + API_VER + COMPANY_STOCKS + STOCK_LIST);
  },
  getHistoricalStockPricesOneMinute: (symbol) => {
    return axios.get(
      API_URL + API_VER + HISTORICAL_CHART + ONE_MINUTE + symbol
    );
  },
  getHistoricalStockPricesOverDays: (symbol, timeRangedays) => {
    return axios.get(
      API_URL +
        API_VER +
        HISTORICAL_PRICE_FULL +
        symbol +
        TIME_SERIES +
        timeRangedays
    );
  },
  getHistoricalStockPricesOverYears: (symbol, rangeYearOne, rangeYearTwo) => {
    return axios.get(
      API_URL +
        API_VER +
        HISTORICAL_PRICE_FULL +
        symbol +
        FROM +
        rangeYearOne +
        TO +
        rangeYearTwo
    );
  },
};

module.exports = financialModelingPrep;
