import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
const deleteButtonStyle = {
  color: "red",
};

export default function WatchlistDeleteSymbol(props) {
  const watchlist = props.watchlist;
  const symbol = props.symbol;
  const token = props.token;
  const user = props.user;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleRemoveSymbolOpen = () => {
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
    // TODO Update redux store after remove
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small">
        <RemoveIcon
          variant="contained"
          style={deleteButtonStyle}
          size="small"
          onClick={handleRemoveSymbolOpen}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete Symbol "{symbol}" from Watchlist: "{watchlist.watchlistName}"?
        </DialogTitle>
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
