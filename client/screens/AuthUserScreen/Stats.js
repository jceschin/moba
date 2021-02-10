import React, { useState, useEffect } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getLinealUserStats, getUserStats } from "../../redux/actions/user";
const { formatDate } = require("date-utils-2020");

const screenWidth = Dimensions.get("window").width;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Stats = () => {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  var amountGraph =
    loggedUser.stats &&
    loggedUser.stats.map((tr) => {
      return {
        incomes: tr.charger + tr.receiver,
        expenses: tr.sender,
      };
    });

  var typeGraph =
    loggedUser.stats &&
    loggedUser.stats.map((tr) => {
      return {
        sentOperations: tr.senderOperations,
        receiverOperations: tr.receiverOperations,
        chargerOperations: tr.chargerOperations,
      };
    });

  const amountGraphData = [
    {
      amount: amountGraph && amountGraph[0].incomes,
      name: "Incomes",
      color: "#303841",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expenses",
      amount: amountGraph && amountGraph[0].expenses,
      color: "#d1d4c9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const typeGraphData = [
    {
      type: typeGraph && typeGraph[0].sentOperations,
      name: "Sents",
      color: "#303841",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Receives",
      type: typeGraph && typeGraph[0].sentOperations,
      color: "#d1d4c9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Recharges",
      type: typeGraph && typeGraph[0].chargerOperations,
      color: "#e7e6e1",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `"#303841", ${opacity}`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const labelStyle = {
    color: chartConfig.color(),
    marginVertical: 10,
    textAlign: "center",
    fontSize: 16,
  };

  const lastWeek = () => {
    let dateTo = new Date();
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 8);
    dispatch(
      getUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );
    dispatch(
      getLinealUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );
  };

  const lastMonth = () => {
    let dateTo = new Date();
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 40);
    dispatch(
      getUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );

    dispatch(
      getLinealUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );
  };

  const last6Months = () => {
    let dateTo = new Date();
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 200);
    dispatch(
      getUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );
    dispatch(
      getLinealUserStats(
        loggedUser.info.account.cvu,
        formatDate(dateFrom, "yyyy-MM-dd"),
        formatDate(dateTo, "yyyy-MM-dd")
      )
    );
  };

  useEffect(() => {
    dispatch(
      getLinealUserStats(
        loggedUser.info.account.cvu,
        "2021-01-06",
        "2021-02-10"
      )
    );
    dispatch(
      getUserStats(loggedUser.info.account.cvu, "2021-01-06", "2021-02-10")
    );
  }, []);

  return (
    <View>
      
      <TouchableOpacity onPress={lastWeek}><Text>Last week</Text></TouchableOpacity>
      <TouchableOpacity onPress={lastMonth}><Text>Last month</Text></TouchableOpacity>
      <TouchableOpacity onPress={last6Months}><Text>Last 6 months</Text></TouchableOpacity>


      <Text style={labelStyle}>Incomes and expenses</Text>

      <PieChart
        data={amountGraphData}
        width={screenWidth}
        height={230}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[20, -20]}
        absolute={true}
      />

      <Text style={labelStyle}>Types of movements</Text>

      <PieChart
        data={typeGraphData}
        width={screenWidth}
        height={230}
        chartConfig={chartConfig}
        accessor={"type"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[20, -20]}
        absolute={true}
      />

      <Text>Bezier Line Chart</Text>
      {loggedUser.linealStats && (
        <LineChart
          data={{
            labels:
              loggedUser.linealStats &&
              loggedUser.linealStats.map((data) => data.date),
            datasets: [
              {
                data:
                  loggedUser.linealStats &&
                  loggedUser.linealStats.map((data) => parseInt(data.amount)),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e2600",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezierz
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default Stats;