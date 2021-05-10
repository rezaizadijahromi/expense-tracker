import { Route, Switch } from "react-router-dom";

// import components
import Home from "./CoreComponents/Home";
import Signup from "./AuthComponents/Signup";
import Signin from "./AuthComponents/Signin";
import Profile from "./UserComponents/Profile";
import Menu from "./CoreComponents/Menu";
import DeleteUserProfile from "./UserComponents/DeleteUserProfile";
import EditUserProfile from "./UserComponents/EditUserProfile";
import NewExpense from "./ExpenseComponents/NewExpense";
import Expenses from "./ExpenseComponents/Expense";

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
        <Route path="/profile/edit/:id" component={EditUserProfile} />
        <Route path="/expenses/all" component={Expenses} />
        <Route path="/expenses/new" component={NewExpense} />
      </Switch>
    </div>
  );
};

export default MainRouter;
