import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
// eslint-disable-next-line
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// eslint-disable-next-line
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";

export default function DeleteExpense() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const match: any = useParams();

  console.log(match.id);

  const clickButton = () => {
    setOpen(true);
  };

  const deleteExpense = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);
    let deleted = false;

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      await axios.delete(
        `https://expense-tracker-rij.herokuapp.com/api/expense/${match.id}`,
        config,
      );
      console.log("deleted");
      deleted = true;
    }

    if (deleted) {
      history.push("/expense/all");
    }
  };
  const handleRequestClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your expense record .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteExpense} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
