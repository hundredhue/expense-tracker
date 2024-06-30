import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  data: any;
  scrollX: any;
};

const Paginator = ({ data, scrollX }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View style={tw`flex-row`}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10], // corrected the typo from 'ouputRange' to 'outputRange'
          extrapolate: "clamp",
        });
        return (
          <Animated.View style={[styles.dot, { width: dotWidth }]} key={i} />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});
