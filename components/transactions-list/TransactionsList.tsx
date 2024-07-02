import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useTransactionsContext } from "@/context/TransactionContext";
import CashFlowItem from "../CashFlowItem/CashFlowItem";
import { findFromArray } from "@/helpers/arrayMethods";

type Props = {};

const TransactionsList = (props: Props) => {
  const { categories, transactions } = useTransactionsContext();
  return (
    <View
      style={tw`bg-white flex-1 p-2 gap-4 rounded-3xl border border-zinc-200/50 mb-20`}
    >
      {transactions?.length < 1 && (
        <View>
          <Text style={tw`text-center text-lg font-bold text-zinc-950`}>
            No transactions yet
          </Text>
          <Text style={tw`text-center text-sm font-medium text-zinc-400`}>
            Start transacting to see yur history
          </Text>
        </View>
      )}
      {transactions.map((item, index) => (
        <CashFlowItem
          key={index}
          name={findFromArray(categories, item.category_id)?.name}
          description={item.description}
          amount={item.amount}
          type={item.type}
        />
      ))}
    </View>
  );
};

export default TransactionsList;

const styles = StyleSheet.create({});
