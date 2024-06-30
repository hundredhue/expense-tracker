import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";

const data = [40, 80, 50, 60, 30, 70, 90]; // Example data points
const lineColor1 = "blue"; // Color for the first set of lines
const lineColor2 = "green"; // Color for the second set of lines
const strokeWidth = 2; // Stroke width of the lines

const LineGraph = () => {
  const lines = data.map((value, index) => {
    const y1 = value;
    const y2 = data[index + 1];
    if (y2 !== undefined) {
      const color = index % 2 === 0 ? lineColor1 : lineColor2;
      return (
        <Line
          key={index}
          x1={index * 20} // Adjust x positioning based on your data and layout
          y1={y1}
          x2={(index + 1) * 20} // Adjust x positioning based on your data and layout
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      );
    }
    return null;
  });

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        {lines}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LineGraph;
