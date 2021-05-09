import { Route, Switch } from "react-router-dom";

// import components
import Home from "./CoreComponents/Home";
import Signup from "./AuthComponents/Signup";
import Signin from "./AuthComponents/Signin";
import Profile from "./UserComponents/Profile";
import Menu from "./CoreComponents/Menu";
import DeleteUserProfile from "./UserComponents/DeleteUserProfile";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/delete/:id" component={DeleteUserProfile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
