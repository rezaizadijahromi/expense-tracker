import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import auth from "./../auth/auth-helper";
// import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";

export default function DeleteUserProfile() {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await axios.delete("http://localhost:5000/api/users/profile");
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteAccount} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteUserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};
