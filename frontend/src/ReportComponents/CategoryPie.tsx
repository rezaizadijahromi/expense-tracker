import axios from "axios";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory";

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
}));

const CategoryPie = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
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
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));

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

      console.log(data.data);

      setExpenses({ monthAVG: data.data.monthAVG });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(expenses);

  const handleDateChange = (name: any) => (date: any) => {
    if (name === "firstDay") {
      setFirstDay(date);
    } else {
      setLastDay(date);
    }
  };

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
      </div>
    </div>
  ) as any;
};

export default CategoryPie;
