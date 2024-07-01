import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  navigation?: any;
  title?: string;
};

const ModalHeader = ({ navigation, title }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`flex-row items-center justify-between px-4 pb-2 border-b border-zinc-200/50`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={tw`p-2 rounded-full bg-zinc-100`}
      >
        <Ionicons name="arrow-back-outline" size={16} color="black" />
      </Pressable>
      <Text style={tw`text-lg font-semibold text-zinc-950`}>{title}</Text>
      <View style={tw`p-4`} />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({});
