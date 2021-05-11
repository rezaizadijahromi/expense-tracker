import axios from "axios";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import DateFnsUtils from "@date-io/date-fns";
// eslint-disable-next-line
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  VictoryTheme,
  VictoryScatter,
  VictoryChart,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
    color: "#2bbd7e",
    display: "inline",
  },
}));

const MonthlyScatter = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [plot, setPlot] = useState([]);

  const loadData = async () => {
    const userLocal = JSON.parse(localStorage.getItem("userInfo")!);

    if (userLocal) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLocal.data.token}`,
        },
      };
      const data = await axios.get(
        "http://localhost:5000/api/expense/plot",
        config,
      );

      console.log(data.data);

      setPlot(data.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Typography variant="h6" className={classes.title}>
        Expenses scattered over{" "}
      </Typography>

      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        width={550}
        domainPadding={40}>
        <VictoryScatter
          style={{
            data: { fill: "#01579b", stroke: "#69f0ae", strokeWidth: 2 },
            labels: { fill: "#01579b", fontSize: 10, padding: 8 },
          }}
          bubbleProperty="y"
          maxBubbleSize={15}
          minBubbleSize={5}
          labels={({ datum }) => `$${datum.y} on ${datum.x}th`}
          labelComponent={<VictoryTooltip />}
          data={plot}
          domain={{ x: [0, 31] }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: "#8b8b8b" }}
          x={270}
          y={390}
          text={`day of month`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: "#8b8b8b" }}
          x={6}
          y={190}
          angle={270}
          text={`Amount ($)`}
        />
      </VictoryChart>
    </div>
  );
};

export default MonthlyScatter;
