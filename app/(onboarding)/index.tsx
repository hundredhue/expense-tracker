import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OnBoarding from "@/components/on-boarding/OnBoarding";
import tw from "twrnc";

type Props = {};

const index = (props: Props) => {
  return (
    <View style={tw`flex-1 bg-[#363946]`}>
      <OnBoarding />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
