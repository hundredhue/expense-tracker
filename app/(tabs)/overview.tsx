import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";

type Props = {};

const Overview = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`bg-zinc-50 h-full w-full gap-4 px-4 py-8`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={tw`min-h-[30%] items-center justify-center`}>
        <Image
          style={tw`h-44 w-44 rounded-lg border border-zinc-200/50 bg-white`}
          source={require("../../assets/images/icon.png")}
        />
      </View>

      <View
        style={tw`bg-white rounded-3xl p-4 border border-zinc-200/50 gap-3`}
      >
        <Text style={tw`text-zinc-950 text-lg font-medium`}>
          Setup your limits
        </Text>
        <TextInput
          style={tw`p-3 border border-zinc-200/50 rounded-xl text-sm`}
          placeholder="Monhtly limit"
        />
        <TextInput
          style={tw`p-3 border border-zinc-200/50 rounded-xl text-sm`}
          placeholder="Weekly limit"
        />
        <TextInput
          style={tw`p-3 border border-zinc-200/50 rounded-xl text-sm`}
          placeholder="Daily limit"
        />
        <PrimaryButton text="Set Limits" />
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({});
