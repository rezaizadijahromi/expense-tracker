import { Route, Switch } from "react-router-dom";

// import components
import Home from "./CoreComponents/Home";
import Signup from "./AuthComponents/Signup";
import Signin from "./AuthComponents/Signin";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
};

export default MainRouter;
