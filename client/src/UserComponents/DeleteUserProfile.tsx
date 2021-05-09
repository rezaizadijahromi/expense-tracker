import axios from "axios";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router";
// import auth from "./../auth/auth-helper";
// import { remove } from "./api-user.js";

function DeleteUserProfile() {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);
    let deleted = false;

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      console.log("delete request");

      await axios.delete("http://localhost:5000/api/users/profile", config);
      deleted = true;
    }

    if (deleted) {
      history.push("/signup");
    }
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  console.log("In user delete");

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
          <Button onClick={deleteAccount} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
export default DeleteUserProfile;
