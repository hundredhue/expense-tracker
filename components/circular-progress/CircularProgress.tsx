// App.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const SIZE = 35; // Adjust size for better visibility
const STROKE_WIDTH = 5; // Adjust stroke width for better visibility
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularProgressBar() {
  const [progress, setProgress] = useState(80);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setProgress(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const incrementProgress = () => {
    setProgress((prevProgress) =>
      prevProgress < 100 ? prevProgress + 10 : 100
    );
  };

  const getColor = () => {
    if (progress < 50) {
      return "#dc2626";
    } else if (progress < 80) {
      return "#fde047";
    } else {
      return "#16a34a";
    }
  };

  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#e6e6e6"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={getColor()}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
