import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/AddBoxRounded";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const isActive = (history: any, path: any) => {
  if (history.location.pathname === path) return { color: "#69f0ae" };
  else return { color: "#ffffff" };
};
const isButtonActive = (history: any, path: any) => {
  if (history.location.pathname.includes(path))
    return { color: "#fffde7", backgroundColor: "#2bbd7e", marginRight: 10 };
  else
    return {
      color: "#2bbd7e",
      backgroundColor: "#ffffff",
      border: "1px solid #2bbd7e",
      marginRight: 10,
    };
};

const profileData = () => {
  const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

  if (userLocal) {
    const config = {
      headers: {
        Authorization: `Bearer ${userLocal.data.token}`,
      },
    };
    // eslint-disable-next-line
    const data = axios.get("http://localhost:5000/api/users/profile", config);

    return userLocal.data;
  }
};

const Menu = () => {
  const history: any = useHistory();
  const [user, setUser]: any = useState();

  const logoutUser = () => {
    // eslint-disable-next-line
    const userLocal = localStorage.removeItem("userInfo");
    history.push(`/signin`);
  };

  useEffect(() => {
    setUser(profileData());
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Expense Tracker
        </Typography>
        <div>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive(history, "/")}>
              <HomeIcon />
            </IconButton>
          </Link>
          {user && (
            <span>
              <Link to={"/expenses/overview"}>
                <Button style={isActive(history, "/expenses/overview")}>
                  Today Expense
                </Button>
              </Link>
              <Link to={"/reports"}>
                <Button style={isActive(history, "/reports")}>Reports</Button>
              </Link>
            </span>
          )}
        </div>
        <div style={{ position: "absolute", right: "10px" }}>
          <span style={{ float: "right" }}>
            {!user && (
              <span>
                <Link to="/signup">
                  <Button style={isActive(history, "/signup")}>Sign up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive(history, "/signin")}>Sign In</Button>
                </Link>
              </span>
            )}
            {user && (
              <span>
                <Link to="/expenses/new">
                  <Button style={isButtonActive(history, "/expenses/new")}>
                    <AddIcon style={{ marginRight: 4 }} /> Add Expense
                  </Button>
                </Link>
                <Link to={"/profile/"}>
                  <Button style={isActive(history, "/profile/")}>
                    My Profile
                  </Button>
                </Link>
                <Button color="inherit" onClick={logoutUser}>
                  Sign out
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
