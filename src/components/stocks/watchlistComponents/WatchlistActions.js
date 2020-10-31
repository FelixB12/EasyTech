import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Title from "../../common/Title";
import WatchlistDelete from "./WatchlistDelete";
export default function WatchListActions(props) {
  const watchlist = props.watchlist;
  const token = props.token;
  const user = props.user;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Title>{watchlist.watchlistName}</Title>
        </Grid>
        <Grid item>
          <WatchlistDelete watchlist={watchlist} token={token} user={user} />
        </Grid>
      </Grid>
    </div>
  );
}
