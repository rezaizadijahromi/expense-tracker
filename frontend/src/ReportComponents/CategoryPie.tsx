import axios from "axios";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `16px ${theme.spacing(2.5)}px 2px`,
    color: "#2bbd7e",
    display: "inline",
  },
  search: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    margin: "8px 16px",
    width: 240,
  },
  submit: {
    margin: "auto",
    marginLeft: "220px",
    marginBottom: theme.spacing(2),
  },
}));

const CategoryPie = () => {
  const classes = useStyles();
  const [expenses, setExpenses]: any = useState([
    {
      monthAVG: {
        _id: "",
        x: "",
        y: 0,
      },
    },
  ]);
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [firstDay, setFirstDay]: any = useState(new Date());
  const [lastDay, setLastDay]: any = useState(new Date());

  const loadData = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      const data = await axios.get(
        "https://expense-tracker-rij.herokuapp.com/api/expense/category/averages",
        config,
      );

      setExpenses({ monthAVG: data.data.monthAVG });
    }
  };

  console.log("here 1");

  const submitDate = async () => {
    console.log("here");
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    const dateData = {
      firstDay,
      lastDay,
    };

    console.log("Data", dateData);
    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      const data = await axios.post(
        "https://expense-tracker-rij.herokuapp.com/api/expense/category/averages",
        dateData,
        config,
      );
      setExpenses({ monthAVG: data.data.monthAVG });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(expenses);

  return (
    <div>
      <div style={{ width: 550, margin: "auto" }}>
        <svg viewBox="0 0 320 320">
          <VictoryPie
            standalone={false}
            data={expenses.monthAVG}
            innerRadius={50}
            theme={VictoryTheme.material}
            labelRadius={({ innerRadius }) => +innerRadius! + 14}
            labelComponent={
              <VictoryLabel
                angle={0}
                style={[
                  {
                    fontSize: "11px",
                    fill: "#0f0f0f",
                  },
                  {
                    fontSize: "10px",
                    fill: "#013157",
                  },
                ]}
                text={({ datum }) => `${datum.x}\n $${datum.y}`}
              />
            }
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 14, fill: "#8b8b8b" }}
            x={175}
            y={170}
            text={`Spent \nper category`}
          />
        </svg>

        <form>
          <TextField
            className={classes.textField}
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={firstDay}
            onChange={(e) => setFirstDay(e.target.value)}
          />

          <TextField
            className={classes.textField}
            id="date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastDay}
            onChange={(e) => setLastDay(e.target.value)}
          />

          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={submitDate}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  ) as any;
};

export default CategoryPie;
