import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
// import DeleteUser from "./DeleteUser";
// import { read } from "./api-user.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    // color: theme.palette.protectedTitle,
  },
}));

const profileData = () => {
  const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

  if (userLocal) {
    const config = {
      headers: {
        Authorization: `Bearer ${userLocal.data.token}`,
      },
    };
    // eslint-disable-next-line
    const data = axios.get(
      "https://expense-tracker-rij.herokuapp.com/api/users/profile",
      config,
    );

    return userLocal.data;
  }
};

export default function Profile() {
  const classes = useStyles();
  const [user, setUser]: any = useState({});
  //   const jwt = auth.isAuthenticated();

  useEffect(() => {
    setUser(profileData());
  }, []);

  console.log(user);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{" "}
          {user && (
            <ListItemSecondaryAction>
              <Link to={`/profile/edit/${user._id}`}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>

              <Link to={`/profile/delete/${user._id}`}>
                <IconButton aria-label="Edit" color="secondary">
                  <Delete />
                </IconButton>
              </Link>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

// garbage code

// const signal = abortController.signal;

// read(
//   {
//     userId: match.params.userId,
//   },
//   { t: jwt.token },
//   signal,
// ).then((data) => {
//   if (data && data.error) {
//     setRedirectToSignin(true);
//   } else {
//     setUser(data);
//   }
// });
