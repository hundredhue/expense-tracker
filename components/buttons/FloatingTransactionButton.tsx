import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import tw from "twrnc";

type Props = {};

const FloatingTransactionButton = (props: Props) => {
  return (
    <Link
      style={[
        tw`absolute bottom-25 right-3 p-4 rounded-full z-50`,
        { backgroundColor: Colors.dark.background },
      ]}
      href={"/transaction-modal"}
      asChild
    >
      <AntDesign name="plus" size={24} color="white" />
    </Link>
  );
};

export default FloatingTransactionButton;

const styles = StyleSheet.create({});
