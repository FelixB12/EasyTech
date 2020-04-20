import React from "react";
import "./App.css";
import Weather from "../weather/weather";
import Navigation from "../header/navigation";
import Homepage from "../homepage/homepage";
import Portfolio from "../portfolio/portfolio";
import SignUp from "../users/signup";
import SignIn from "../users/signin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/Home" component={Homepage} />
          {/*<Route path="/Weather" component={Weather} />*/}
          <Route path="/Portfolio" component={Portfolio} />
          {/*<Route path="/StockTicker" component={StockTicker} /> TODO Add stock ticker*/}
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
