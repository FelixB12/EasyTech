import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { addSymbol } from "../../../actions/WatchlistActions";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
const addButtonStyle = {
  color: "green",
};

export default function WatchlistAddSymbol(props) {
  const watchlist = props.watchlist;
  const token = props.token;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [symbol, setSymbol] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // Call API to handle add sumbol
    // make sure to verify user
    // TODO Update redux store after Add
    dispatch(addSymbol(watchlist.id, symbol, token));

    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small">
        <AddIcon
          variant="contained"
          style={addButtonStyle}
          size="small"
          onClick={handleClickOpen}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add Symbol to Watchlist: "{watchlist.watchlistName}"
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Enter Symbol</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="new-symbol"
            label="Enter symbol"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
