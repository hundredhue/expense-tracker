import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CircularProgressBar from "../circular-progress/CircularProgress";
import tw from "twrnc";
import { useLimitsContext } from "@/context/LimitsContext";
import { useTransactionsContext } from "@/context/TransactionContext";

const GoalReachedComponent = () => {
  const { monthlyLimit } = useLimitsContext();
  const { totalAmount, monthlyExpenses } = useTransactionsContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (monthlyLimit > 0) {
      setProgress(
        // @ts-ignore
        (monthlyExpenses?.totalExpenses?.toFixed(2) / monthlyLimit) * 100
      );
    }
    // @ts-ignore
  }, [monthlyLimit, monthlyExpenses?.totalExpenses]);

  console.log("monthlyExpenses: ", progress);
  return (
    <View
      style={tw`bg-white rounded-full p-3 flex flex-row items-center border gap-2 border-zinc-200/50 `}
    >
      <View>
        <CircularProgressBar progress={progress} />
      </View>
      <View style={tw`flex flex-col flex-1`}>
        <Text style={tw`font-bold text-zinc-950`}>Monthly budget</Text>
        <Text style={tw`text-xs text-zinc-400`}>budget friedly</Text>
      </View>
      <View style={tw`flex flex-col flex-1 pr-2`}>
        <Text style={tw`font-bold text-zinc-950 text-right`}>
          {monthlyLimit > 0 ? (
            <>
              {/* @ts-ignore */}$
              {monthlyLimit - monthlyExpenses.totalExpenses?.toFixed(2)}
            </>
          ) : (
            <>{/* @ts-ignore */}$ 0</>
          )}{" "}
          left
        </Text>
        <Text style={tw`text-xs text-zinc-400 text-right`}>
          of ${monthlyLimit}
        </Text>
      </View>
    </View>
  );
};

export default GoalReachedComponent;

const styles = StyleSheet.create({});
