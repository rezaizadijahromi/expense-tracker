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
// eslint-disable-next-line
import Expenses from "./ExpenseComponents/Expense";
import DeleteExpense from "./ExpenseComponents/DeleteExpense";
import ExpenseOverview from "./ExpenseComponents/ExpenseOverview";
import CategoryPie from "./ReportComponents/CategoryPie";
import MonthlyScatter from "./ReportComponents/MonthlyScatter";
import YearlyBar from "./ReportComponents/YearlyBar";
import Reports from "./ReportComponents/Reports";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/delete/:id" component={DeleteUserProfile} />
        <Route path="/profile/edit/:id" component={EditUserProfile} />
        {/* <Route path="/expenses/all" component={Expenses} /> */}
        <Route path="/expenses/new" component={NewExpense} />
        <Route path="/expenses/delete/:id" component={DeleteExpense} />
        <Route path="/expenses/overview" component={ExpenseOverview} />

        <Route path="/reports/pie" component={CategoryPie} />
        <Route path="/reports/plot" component={MonthlyScatter} />
        <Route path="/reports/yearly" component={YearlyBar} />
        <Route path="/reports" component={Reports} />
      </Switch>
    </div>
  );
};

export default MainRouter;
