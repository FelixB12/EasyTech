import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import { API_URL, WATCHLIST_CREATE } from "../../constants/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createWatchlist } from "../../../actions/WatchlistActions";
import { ThemeProvider } from "@material-ui/styles";
import { lightGreen } from "@material-ui/core/colors";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Title from "../../common/Title";

const useStyles = makeStyles((theme) => ({
  green: {
    backgroundColor: theme.palette.success,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#64dd17",
    },
  },
});

export default function WatchListCreateNew(user) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [watchListName, setWatchListName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    console.log("Create User");
    if (watchListName !== "" && user !== null) {
      console.log(user);
      setOpen(false);
      dispatch(createWatchlist(watchListName, user));
    }
    // TODO load a snackbar when watchlist has finished creating
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      {/* <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClickOpen}
        >
          Create
        </Button>
      </ThemeProvider> */}
      <Grid container spacing={2}>
        <Grid item>
          <Title>Watchlists</Title>
        </Grid>
        <Grid item>
          <IconButton size="small">
            <PlaylistAddIcon onClick={handleClickOpen} />
          </IconButton>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Watchlist</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Watchlist name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="watchlist-name"
            label="Watchlist Name"
            onChange={(e) => setWatchListName(e.target.value)}
            value={watchListName}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="inherit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
