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
      style={[tw`rounded-full `, { backgroundColor: Colors.dark.background }]}
    >
      <Text style={tw`text-white text-center p-3 `}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
