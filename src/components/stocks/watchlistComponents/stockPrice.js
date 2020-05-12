import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    maxWidth: "100%",
    maxHeight: "75%",
    minHeight: "75%",
    border: "1px solid black",
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * Displays just the stock price of a company
 */
export default function StockPrice(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {props.symbol}
        </Typography>
        <Typography variant="body2">{props.price}</Typography>
        <Typography variant="body2" component="p">
          Open
        </Typography>
        <Typography variant="body2" component="p">
          Close
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
