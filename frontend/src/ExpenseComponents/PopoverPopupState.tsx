import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Category } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    fontSize: "1em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

export default function PopoverPopupState() {
  const classes = useStyles();
  const [category, setCategory]: any = useState("");

  const handlelSubmit = async () => {
    let categori = {
      category: category,
    };

    let response = await axios.post(
      "https://expense-tracker-rij.herokuapp.com/api/expense/category",
      categori,
    );

    window.location.reload();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}>
            Create category
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}>
            <Box p={2}>
              <form onSubmit={handlelSubmit}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  margin="normal"
                />
              </form>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
