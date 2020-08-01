import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
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
  listItemTextSecondaryGreen: {
    color: "green",
    fontSize: "0.7em",
  },
  listItemTextSecondaryRed: {
    fontSize: "0.7em",
    color: "red",
  },
  listItemTextPrimary: {
    fontSize: "0.7em",
  },
  paper: {
    //padding: theme.spacing(1),
    //textAlign: "center",
    //color: theme.palette.text.secondary,
  },
}));

/**
 * Displays just the stock price of a company
 */
export default function StockPrice(props) {
  const classes = useStyles();

  function FormRow() {
    return <React.Fragment></React.Fragment>;
  }

  return (
    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography variant="body2" component="h2">
    //       {props.symbol}
    //     </Typography>
    //     <Typography variant="body2">{props.price}</Typography>
    //     <Typography variant="body2" component="p">
    //       Open
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       Close
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>

    // TODO Checkout react-carousel
    <div>
      <List>
        <ListItem>
          <ListItemText
            classes={{
              // secondary: classes.listItemTextSecondary,
              secondary:
                Math.sign(props.changesPercentage) === 1
                  ? classes.listItemTextSecondaryGreen
                  : classes.listItemTextSecondaryRed,
              primary: classes.listItemTextPrimary,
            }}
            primary={
              <div>
                <div>{props.symbol}</div> <div>{props.price.toFixed(2)}</div>
              </div>
            }
            secondary={
              <div>
                <div>
                  {props.change.toFixed(2)} (
                  {props.changesPercentage.toFixed(2)}%)
                </div>
              </div>
            }
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
