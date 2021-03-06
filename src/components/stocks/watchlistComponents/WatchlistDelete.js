import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deleteWatchlist } from "../../../actions/WatchlistActions";

const deleteButtonStyle = {
  color: "red",
};

export default function WatchlistDelete(props) {
  const watchlist = props.watchlist;
  const token = props.token;
  const user = props.user;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteWatchlist(watchlist._id, token, user.userData.id));
    // TODO After Delete Update redux store
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small">
        <DeleteIcon
          variant="contained"
          style={deleteButtonStyle}
          size="small"
          onClick={handleClickOpen}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Watchlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete watchlist "{watchlist.watchlistName}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
