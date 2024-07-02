import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {
  text: string;
  loading?: boolean;
  onPress?: () => void;
};

const PrimaryButton = ({ text, loading, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={loading ? () => console.log("loadinig...") : onPress}
      style={[tw`rounded-full `, { backgroundColor: Colors.dark.background }]}
    >
      <Text style={tw`text-white text-center p-3 `}>
        {loading ? "loading..." : text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
