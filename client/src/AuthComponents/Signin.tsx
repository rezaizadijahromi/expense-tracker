import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { ExpandLessSharp } from "@material-ui/icons";

interface UserSignIn {
  email: string;
  password: string;
  error: string;
}

const isActive = (history: any, path: any) => {
  if (history.location.pathname === path) return { color: "#69f0ae" };
};

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

const Signin: React.FC<UserSignIn> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const userLocal = JSON.parse(localStorage.getItem("userInfo") as any);


  const clickSubmit = async () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const response: UserSignIn = await axios.post(
      "http://localhost:5000/api/users/login",
      user,
    );

    localStorage.setItem("userInfo", JSON.stringify(response));

    if (response.error) {
      setValues({ ...values, error: response.error });
    } else {
      setValues({ ...values, error: "" });
      history.push("/profile");
      window.location.reload();
    }
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

  useEffect(() => {
    if (userLocal){
      history.push("/profile")
    }
  })
  // props is here
  // const { from } = {
  //   from: {
  //     pathname: "/",
  //   },
  // };
  // const { redirectToReferrer } = values;
  // if (redirectToReferrer) {
  //   return <Redirect to={from} />;
  // }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
        </Typography>
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

      <span>
        <Link to={"/signup"} style={{textDecoration: "None"}}>
          <span>For creating account click </span> here
        </Link>
      </span>
    </Card>
  );
};

export default Signin;

// Garbage code

// signin(user).then((data) => {
//   if (data.error) {
//     setValues({ ...values, error: data.error });
//   } else {
//     auth.authenticate(data, () => {
//       setValues({ ...values, error: "", redirectToReferrer: true });
//     });
//   }
// });

//   const handleChange = (name, event) => {
//     setValues({ ...values, [name]: event.target.value });
//   };
