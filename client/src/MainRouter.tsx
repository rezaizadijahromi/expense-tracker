import { Route, Switch } from "react-router-dom";

// import components
import Home from "./CoreComponents/Home";
import Signup from "./AuthComponents/Signup";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};

export default MainRouter;
