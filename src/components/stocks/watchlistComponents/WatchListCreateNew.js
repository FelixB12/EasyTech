import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { createWatchlist } from "./../../../actions/watchlistActions";

const useStyles = makeStyles((theme) => ({}));

export default function WatchListCreateNew() {
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
    if (watchListName !== "") {
      setOpen(false);
      dispatch(createWatchlist(watchListName));
    }
    // TODO load a snackbar when watchlist has finished creating
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        Create
      </Button>
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
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
