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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

interface UserSignup {
  name: string;
  password: string;
  email: string;
  open: true | false;
  error: string;
}

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
    // color: theme.palette.openTitle,
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
}));

const Signup: React.FC<UserSignup> = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  //   const handleChange = (name, event) => {
  //     setValues({ ...values, [name]: event.target.value });
  //   };

  const clickSubmit = async () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      error: values.error,
    };
    console.log("here 1");

    let response: UserSignup = await axios.post(
      "http://localhost:5000/api/users/",
      user,
    );

    console.log("here 2");

    localStorage.setItem("userInfo", JSON.stringify(response));

    if (response.error) {
      setValues({ ...values, error: response.error });
    } else {
      setValues({ ...values, error: "", open: true });
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <form onSubmit={clickSubmit}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Sign Up
            </Typography>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleName}
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleEmail}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handlePassword}
              margin="normal"
            />
            <br />{" "}
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>
        </form>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values?.open!} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
