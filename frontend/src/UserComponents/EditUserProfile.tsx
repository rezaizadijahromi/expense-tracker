import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    // color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
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

interface UserData {
  name: string;
  password: string;
  email: string;
  open: true | false;
  error: string;
}

function EditUserProfile() {
  const classes = useStyles();
  const [values, setValues]: any = useState({
    name: "",
    email: "",
    password: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  const history = useHistory();

  const clickSubmit = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      error: values.error,
    };
    console.log("here 1");

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      let response: UserData = await axios.put(
        "http://localhost:5000/api/users/profile",
        user,
        config,
      );

      console.log("here 2");
      console.log(response);

      //   localStorage.setItem("userInfo", JSON.stringify(response));

      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    }
  };

  const loadData = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);
    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      const data = await axios.get<UserData>(
        "http://localhost:5000/api/users/profile",
        config,
      );

      console.log(data.data);

      setValues(data.data);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    loadData();
  });

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
    <form onSubmit={clickSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
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
    </form>
  );
}

export default EditUserProfile;
