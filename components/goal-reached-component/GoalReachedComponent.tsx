import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularProgressBar from "../circular-progress/CircularProgress";
import tw from "twrnc";

type Props = {};

const GoalReachedComponent = (props: Props) => {
  return (
    <View
      style={tw`bg-white rounded-full p-3 flex flex-row items-center border gap-2 border-zinc-200/50 `}
    >
      <View>
        <CircularProgressBar />
      </View>
      <View style={tw`flex flex-col flex-1`}>
        <Text style={tw`font-bold text-zinc-950`}>Monthly budget</Text>
        <Text style={tw`text-xs text-zinc-400`}>156 a day</Text>
      </View>
      <View style={tw`flex flex-col flex-1 pr-2`}>
        <Text style={tw`font-bold text-zinc-950 text-right`}>
          $1672.50 left
        </Text>
        <Text style={tw`text-xs text-zinc-400 text-right`}>of $5000</Text>
      </View>
    </View>
  );
};

export default GoalReachedComponent;

const styles = StyleSheet.create({});
