import axios from "axios";

import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
// import auth from '../auth/auth-helper'

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

interface ExpenseData {
  title: string;
  category: string;
  amount: number;
  incurred_on: any;
  notes: string;
  error: string;
}

const NewExpense = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    category: "",
    amount: 0,
    incurred_on: new Date() as any,
    notes: "",
    error: "",
  });

  const history = useHistory();

  // Handler Changes
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      amount: +e.target.value,
    });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      category: e.target.value,
    });
  };

  const handleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      notes: e.target.value,
    });
  };

  const handelDate: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      incurred_on: e.target.value,
    });
  };

  // End Handlers

  // Submit

  const clickSubmit = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    const expense = {
      title: values.title || undefined,
      category: values.category || undefined,
      amount: values.amount || undefined,
      incurred_on: values.incurred_on || undefined,
      notes: values.notes || undefined,
    };

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };

      let response = await axios.post<ExpenseData>(
        "https://expense-tracker-rij.herokuapp.com/api/expense/",
        expense,
        config,
      );

      if (response.status === 201) {
        if (response.data.error) {
          setValues({ ...values, error: response.data.error });
        } else {
          setValues({ ...values, error: "" });
        }

        history.push("/reports");
      }
    }
  };

  // end Submit

  return (
    <div>
      <form onSubmit={clickSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="h2" className={classes.title}>
              Expense Record
            </Typography>
            <br />
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              value={values.title}
              onChange={handleTitle}
              margin="normal"
            />
            <br />
            <TextField
              id="amount"
              label="Amount ($)"
              className={classes.textField}
              value={values.amount}
              onChange={handleAmount}
              margin="normal"
              type="number"
            />
            <br />
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={values.category}
              onChange={handleCategory}
              margin="normal"
            />
            <br />
            <TextField
              id="multiline-flexible"
              label="Notes"
              multiline
              rows="2"
              value={values.notes}
              onChange={handleNotes}
              className={classes.textField}
              margin="normal"
            />
            <br />
            <br />
            <TextField
              className={classes.textField}
              id="date"
              type="date"
              defaultValue="2017-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              value={values.incurred_on}
              onChange={handelDate}
            />
            <br /> <br />
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              className={classes.submit}>
              Submit
            </Button>
            <Link to="/myauctions" className={classes.submit}>
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default NewExpense;
