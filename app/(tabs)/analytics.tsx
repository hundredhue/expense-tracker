import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import RoundedBarGraph from "@/components/graphs/RoundedBarGraphs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoalReachedComponent from "@/components/goal-reached-component/GoalReachedComponent";
import { Feather, Fontisto, AntDesign } from "@expo/vector-icons";

type Props = {};

const Analytics = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`gap-6 w-full px-4 py-8 h-full bg-zinc-50`,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Text style={tw`text-center font-semibold text-zinc-700`}>
        Statistics
      </Text>
      <View style={tw`h-[30%]`}>
        <RoundedBarGraph />
      </View>
      <GoalReachedComponent />
      <View style={tw`gap-4`}>
        <Text style={tw` font-semibold text-zinc-700 pl-2`}>
          Monthly Report
        </Text>

        <View style={tw`flex-row flex-wrap justify-between`}>
          <OverviewItem
            icon={<Feather name="credit-card" size={24} color="#819595" />}
            count="12"
            label="Transactions"
          />
          <OverviewItem
            icon={<Fontisto name="dollar" size={24} color="#819595" />}
            count="50%"
            label="Money Saved"
          />
          <OverviewItem
            icon={<AntDesign name="staro" size={24} color="#819595" />}
            count="5"
            label="Active Goals"
          />
          <OverviewItem
            icon={<Feather name="download" size={24} color="#819595" />}
            count="12"
            label="Revenue"
          />
        </View>
      </View>
    </View>
  );
};

interface OverviewItemProps {
  icon: any;
  count: string;
  label: string;
}

const OverviewItem = ({ icon, count, label }: OverviewItemProps) => {
  return (
    <View
      style={[
        tw`bg-white rounded-3xl gap-2 p-4 border border-zinc-200/50 flex-col mb-2`,
        styles.gridItem,
      ]}
    >
      <View style={tw`flex flex-row justify-between`}>
        {icon}
        <Text style={tw`text-zinc-950 text-2xl font-semibold`}>{count}</Text>
      </View>
      <Text style={tw`text-zinc-950 font-medium text-lg`}>{label}</Text>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Adjust as needed
  },
  gridItem: {
    width: "49%", // Adjust based on your 2 column requirement
    aspectRatio: 1, // Ensures each item is square, adjust as needed
  },
});
