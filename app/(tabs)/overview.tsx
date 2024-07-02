import React, { useState } from "react";
import { Image, Text, TextInput, View, Alert } from "react-native";
import tw from "twrnc";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useLimitsContext } from "@/context/LimitsContext";

type Props = {};

const Overview = (props: Props) => {
  const insets = useSafeAreaInsets();
  const { setLimits } = useLimitsContext();

  // State variables for input fields
  const [monthlyInput, setMonthlyInput] = useState("");

  const handleSetLimits = () => {
    // Convert input strings to numbers
    const monthly = parseFloat(monthlyInput);

    // Validate input
    if (isNaN(monthly)) {
      Alert.alert("Error", "Please enter valid numeric values for all limits.");
      return;
    }

    // Update limits in context
    setLimits(monthly);

    // Optionally, clear input fields
    setMonthlyInput("");

    // Provide feedback to user
    Alert.alert("Success", "Limits updated successfully.");
  };

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
          placeholder="Monthly limit"
          value={monthlyInput}
          onChangeText={setMonthlyInput}
          keyboardType="numeric"
        />

        <PrimaryButton text="Set Limits" onPress={handleSetLimits} />
      </View>
    </View>
  );
};

export default Overview;
