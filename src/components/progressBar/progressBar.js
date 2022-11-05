import { Icon } from "@ui-kitten/components";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 14,
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    width: "100%",
    backgroundColor: "#F4E4E4",
    borderColor: "#E52326",
    borderWidth: 1,
    borderRadius: 25,
  },
  status: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "right",
    fontWeight: "bold",
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finished: {
    color: "#E52326",
  },
});

export const ProgressBar = (props) => {
  const { finished, target, isTimer, setTimeoutDisplay, setQuitExamDisplay } =
    props;
  const [counter, setCounter] = React.useState(target * 60);

  if (isTimer) {
    React.useEffect(() => {
      let id = null;
      if (counter > 0) {
        id = setTimeout(() => {
          setCounter(() => counter - 1)
        }, 1000);
      }
      if (counter == 0) {
        setQuitExamDisplay(false);
        setTimeoutDisplay(true);
      }
      return () => clearTimeout(id);
    }, [counter]);
  }

  return (
    <React.Fragment>
      {isTimer ? (
        <View style={styles.container}>
          <View style={styles.progressBar}>
            <View
              style={{
                backgroundColor: "#E53A3D",
                borderRadius: 25,
                width: `${(counter / (target * 60)) * 100}%`,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              marginRight: 8,
            }}
          >
            <Icon
              name="clock-outline"
              fill="#000"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {counter < 120 && counter > 0 ? (
              <Text style={{ ...styles.finished, fontWeight: "bold" }}>
                Last {counter} Second!
              </Text>
            ) : counter < (target * 60) / 2 &&
              counter > (target * 60) / 2 - 30 ? (
              <Text style={{ ...styles.finished, fontWeight: "bold" }}>
                Half time Warning!
              </Text>
            ) : (
              <Text style={styles.timer}>
                <Text style={styles.finished}>{Math.floor(counter / 60)}</Text>{" "}
                / {target} mins
              </Text>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.progressBar}>
            {finished <= target ? <View
              style={{
                backgroundColor: "#E53A3D",
                borderRadius: 25,
                width: `${(finished / target) * 100}%`,
              }}
            /> : <View
              style={{
                backgroundColor: "#E53A3D",
                borderRadius: 25,
                width: "100%",
              }}
            />}
          </View>
          <Text style={styles.status}>
            <Text style={styles.finished}>{finished}</Text> / {target}
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};
