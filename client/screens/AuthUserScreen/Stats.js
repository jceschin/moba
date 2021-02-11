import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
const Stats = ({ navigation }) => {
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  var amountGraph, typeGraph, amountGraphData, typeGraphData;
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const [pickDate, setPickDate] = useState("");

  if (loggedUser.stats && loggedUser.linealStats) {
    if (loggedUser.stats.length && loggedUser.linealStats.length) {
      console.log("LOGGEDUSER", loggedUser.stats);
      amountGraph = loggedUser.stats.map((tr) => {
        return {
          incomes: tr.charger + tr.receiver,
          expenses: tr.sender,
        };
      });

      typeGraph = loggedUser.stats.map((tr) => {
        return {
          sentOperations: tr.senderOperations,
          receiverOperations: tr.receiverOperations,
          chargerOperations: tr.chargerOperations,
        };
      });

      amountGraphData = [
        {
          amount: amountGraph[0].incomes,
          name: "Incomes",
          color: "#521886",
          legendFontColor: "rgba(0, 0, 0, 0.81)",
          legendFontSize: 15,
          legendFontFamily: "OpenSans_700Bold",
        },
        {
          name: "Expenses",
          amount: amountGraph[0].expenses,
          color: "#7a24c7",
          legendFontColor: "rgba(0, 0, 0, 0.81)",
          legendFontSize: 15,
          legendFontFamily: "OpenSans_700Bold",
        },
      ];

      typeGraphData = [
        {
          type: typeGraph[0].sentOperations,
          name: "Sents",
          color: "#521886",
          legendFontColor: "rgba(0, 0, 0, 0.81)",
          legendFontSize: 15,
          legendFontFamily: "OpenSans_700Bold",
        },
        {
          name: "Receives",
          type: typeGraph[0].sentOperations,
          color: "#7a24c7",
          legendFontColor: "rgba(0, 0, 0, 0.81)",
          legendFontSize: 15,
          legendFontFamily: "OpenSans_700Bold",
        },
        {
          name: "Recharges",
          type: typeGraph[0].chargerOperations,
          color: "#2a0c45",
          legendFontColor: "rgba(0, 0, 0, 0.81)",
          legendFontSize: 15,
          legendFontFamily: "OpenSans_700Bold",
        },
      ];
    }
  }

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

  const lastWeek = () => {
    let dateTo = new Date();
    let dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 8);
    dateTo.setDate(dateTo.getDate() + 1)
    setPickDate("lastWeek");
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
    dateTo.setDate(dateTo.getDate() + 1)
    setPickDate("lastMonth");
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
    dateTo.setDate(dateTo.getDate() + 1)
    setPickDate("last6Months");
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

  useEffect(() => {
    setPickDate("lastMonth");
  }, []);

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.welcomeView}>
            <Text style={styles.text_header}>Your Movements</Text>
          </View>
        </View>
        <View style={styles.lineChartContainer}>
          {(loggedUser.linealStats && loggedUser.linealStats.length) ? (

            <LineChart
              data={{
                labels: loggedUser.linealStats.map((data) => data.date),
                datasets: [
                  {
                    data: loggedUser.linealStats.map((data) =>
                      parseInt(data.amount)
                    ),
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={190}
              yAxisLabel="$"
              yAxisInterval={1}
              withInnerLines={true}
              withOuterLines={false}
              chartConfig={{
                backgroundColor: "#521886",
                backgroundGradientFrom: "#521886",
                backgroundGradientTo: "#521886",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "1",
                  stroke: "rgba(36, 9, 61, 1)",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : null}
        </View>
        <View style={styles.footer}>
          <View style={styles.rowTime}>
            <View
              style={{
                borderBottomColor:
                  pickDate === "lastWeek" ? "#521886" : "#C4C4C4",
                borderBottomWidth: 2,
                width: 170,
                right: 0,
              }}
            >
              <TouchableOpacity onPress={lastWeek} style={styles.lastWeek}>
                <Text
                  style={[
                    styles.textFamily,
                    pickDate === "lastWeek"
                      ? styles.colorSelected
                      : styles.colorUnselected,
                  ]}
                >
                  Last week
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor:
                  pickDate === "lastMonth" ? "#521886" : "#C4C4C4",
                borderBottomWidth: 2,
                width: 170,
                right: 0,
              }}
            >
              <TouchableOpacity onPress={lastMonth} style={styles.lastMonth}>
                <Text
                  style={[
                    styles.textFamily,
                    pickDate === "lastMonth"
                      ? styles.colorSelected
                      : styles.colorUnselected,
                  ]}
                >
                  Last month
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor:
                  pickDate === "last6Months" ? "#521886" : "#C4C4C4",
                borderBottomWidth: 2,
                width: 170,
                right: 0,
              }}
            >
              <TouchableOpacity
                onPress={last6Months}
                style={styles.last6Months}
              >
                <Text
                  style={[
                    styles.textFamily,
                    pickDate === "last6Months"
                      ? styles.colorSelected
                      : styles.colorUnselected,
                  ]}
                >
                  Last 6 months
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pieChartContainer}>
            <Text
              style={{
                position: "absolute",
                top: 29,
                left: 263,
                color: "rgba(0, 0, 0, 0.81)",
                fontSize: 13,
              }}
            >
              $
            </Text>
             <Text
              style={{
                position: "absolute",
                top: 109,
                left: 263,
                color: "rgba(0, 0, 0, 0.81)",
                fontSize: 13,
              }}
            >
              $
            </Text>
            {(amountGraphData && amountGraphData.length) ? (

              <PieChart
                data={amountGraphData}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[20, -20]}
                absolute={true}
              />
            ) : (
              <Text>No movements</Text>
            )}
            {(typeGraphData && typeGraphData.length) ? (

              <PieChart
                data={typeGraphData}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"type"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[20, -20]}
                absolute={true}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
};

export default Stats;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#521886",
    flex: 1,
  },
  lineChartContainer: {
    alignItems: "center",
    left: 5
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 0,
    alignItems: "center"
  },
  rowTime: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  lastWeek: {
    left: 65,
  },
  last6Months: {
    left: 10,
  },
  lastMonth: {
    left: 40,
  },
  colorSelected: {
    color: "#521886",
  },
  colorUnselected: {
    color: "rgba(123, 123, 123, 1)",
  },
  text_header: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
  },
  textRecover: {
    fontFamily: "OpenSans_600SemiBold",
    color: "black",
    fontSize: 18,
    marginTop: 38,
  },
  textFamily: {
    fontFamily: "OpenSans_600SemiBold"
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
  },
  pieChartContainer: {
    marginTop: 20,
  },
});
