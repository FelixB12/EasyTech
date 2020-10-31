export const API_URL = process.env.API || "http://localhost:3001/";
export const COMPANY_QUOTES = "stocks/companyQuote/";
export const STOCKS_MULTIPLE_SYMBOLS = "stocks/multipleStocks?symbols=";
export const GET_SINGLE_WATCHLIST =
  "watchlist/getSingleWatchlist/:?watchlistId=";
export const WATCHLIST_CREATE = "watchlist/create";
export const WATCHLIST_DELETE = "watchlist/deleteWatchlist?watchlistId=";
export const USER_REGISER = "user/register";
export const USER_AUTH = "users/auth";
export const ADD_SYMBOL = "watchlist/addSymbol";
