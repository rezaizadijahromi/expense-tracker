import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
// eslint-disable-next-line
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
// import DeleteExpense from "./DeleteExpense";
import Icon from "@material-ui/core/Icon";
import {
  // eslint-disable-next-line
  DatePicker,
  // eslint-disable-next-line
  DateTimePicker,
  // eslint-disable-next-line
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: "800px",
    margin: "auto",
    marginTop: 40,
    marginBottom: 40,
  },
  heading: {
    fontSize: "1.5em",
    fontWeight: theme.typography.fontWeightRegular,

    marginTop: 12,
    marginBottom: 4,
  },
  error: {
    verticalAlign: "middle",
  },
  notes: {
    color: "grey",
  },
  panel: {
    border: "1px solid #58bd7f",
    margin: 6,
  },
  info: {
    marginRight: 32,
    width: 90,
  },
  amount: {
    fontSize: "2em",
    color: "#2bbd7e",
  },
  search: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textField: {
    margin: "8px 16px",
    width: 240,
  },
  buttons: {
    textAlign: "right",
  },
  status: {
    marginRight: 8,
  },
  date: {
    fontSize: "1.1em",
    color: "#8b8b8b",
    marginTop: 4,
  },
}));

export default function Expenses() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [saved, setSaved] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([{}]) as any;
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  // eslint-disable-next-line
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  // eslint-disable-next-line
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));
  useEffect(() => {}, []);
  // eslint-disable-next-line
  const handleSearchFieldChange = (name: any) => (date: any) => {
    if (name === "firstDay") {
      setFirstDay(date);
    } else {
      setLastDay(date);
    }
  };
  // eslint-disable-next-line
  const handleChange = (name: any, index: any) => (event: any) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = event.target.value;
    setExpenses(updatedExpenses);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses({
      title: e.target.value,
    });
  };

  const handleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses({
      notes: e.target.value,
    });
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses({
      amount: e.target.value,
    });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenses({
      category: e.target.value,
    });
  };

  return (
    <div className={classes.root}>
      {/* <div className={classes.search}> */}
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableFuture
            format="dd/MM/yyyy"
            label="SHOWING RECORDS FROM"
            className={classes.textField}
            views={["year", "month", "date"]}
            value={firstDay}
            onChange={handleSearchFieldChange("firstDay")}
          />
          <DatePicker
            format="dd/MM/yyyy"
            label="TO"
            className={classes.textField}
            views={["year", "month", "date"]}
            value={lastDay}
            onChange={handleSearchFieldChange("lastDay")}
          />
        </MuiPickersUtilsProvider> */}
      {/* <Button variant="contained" color="secondary" onClick={searchClicked}>
          GO
        </Button> */}
      {/* </div> */}

      {expenses.map((expense: any, index: any) => {
        return (
          <span key={index}>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary expandIcon={<Edit />}>
                <div className={classes.info}>
                  <Typography className={classes.amount}>
                    $ {expense.amount}
                  </Typography>
                  <Divider style={{ marginTop: 4, marginBottom: 4 }} />
                  <Typography>{expense.category}</Typography>
                  <Typography className={classes.date}>
                    {new Date(expense.incurred_on).toLocaleDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography className={classes.heading}>
                    {expense.title}
                  </Typography>
                  <Typography className={classes.notes}>
                    {expense.notes}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails style={{ display: "block" }}>
                <div>
                  <TextField
                    label="Title"
                    className={classes.textField}
                    value={expense.title}
                    onChange={handleTitle}
                    margin="normal"
                  />
                  <TextField
                    label="Amount ($)"
                    className={classes.textField}
                    value={expense.amount}
                    onChange={handleAmount}
                    margin="normal"
                    type="number"
                  />
                </div>
                <div>
                  <TextField
                    label="Category"
                    className={classes.textField}
                    value={expense.category}
                    onChange={handleCategory}
                    margin="normal"
                  />
                </div>
                <TextField
                  label="Notes"
                  multiline
                  rows="2"
                  value={expense.notes}
                  onChange={handleNotes}
                  className={classes.textField}
                  margin="normal"
                />
                <div className={classes.buttons}>
                  {error && (
                    <Typography component="p" color="error">
                      <Icon color="error" className={classes.error}>
                        error
                      </Icon>
                      {error}
                    </Typography>
                  )}
                  {saved && (
                    <Typography
                      component="span"
                      color="secondary"
                      className={classes.status}>
                      Saved
                    </Typography>
                  )}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </span>
        );
      })}
    </div>
  );
}
