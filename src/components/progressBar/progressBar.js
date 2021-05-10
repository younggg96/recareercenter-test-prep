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
  finished: {
    color: "#E52326",
  },
});

export const ProgressBar = (props) => {
  const { finished, target } = props;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={{
            backgroundColor: "#E53A3D",
            borderRadius: 25,
            width: `${(finished / target) * 100}%`,
          }}
        />
      </View>

      <Text style={styles.status}>
        <Text style={styles.finished}>{finished}</Text> / {target}
      </Text>
    </View>
  );
};
