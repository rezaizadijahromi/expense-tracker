import axios from "axios";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { VictoryTheme, VictoryAxis, VictoryBar, VictoryChart } from "victory";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
    color: "#2bbd7e",
    display: "inline",
  },
}));

const YearlyBar = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [year, setYear] = useState(new Date());
  const [yearlyExpense, setYearlyExpense] = useState([]);
  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as any;

  const loadData = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      const data = await axios.get(
        "http://localhost:5000/api/expense/yearly",
        config,
      );

      console.log(data.data);

      setYearlyExpense(data.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Your monthly expenditures in
      </Typography>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={300}
        width={450}>
        <VictoryAxis />
        <VictoryBar
          categories={{
            x: monthStrings,
          }}
          style={{
            data: { fill: "#69f0ae", width: 20 },
            labels: { fill: "#01579b" },
          }}
          data={yearlyExpense}
          x={monthStrings["x"]}
          domain={{ x: [0, 13] }}
          labels={({ datum }) => `$${datum.y}`}
        />
      </VictoryChart>
    </div>
  );
};

export default YearlyBar;
