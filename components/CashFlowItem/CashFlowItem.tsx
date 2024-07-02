import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { useTransactionsContext } from "@/context/TransactionContext";

type Props = {
  name: string;
  type: string;
  description: string;
  amount: number;
  id: any;
};

const CashFlowItem = (props: Props) => {
  const { transactions, removeTransaction } = useTransactionsContext();

  const handleRemoveTransaction = (id: number) => {
    removeTransaction(id);
  };

  return (
    <TouchableOpacity
      onLongPress={() => handleRemoveTransaction(props.id)}
      activeOpacity={0.7}
      style={tw`flex flex-row items-center gap-2  `}
    >
      <View style={tw`bg-zinc-100 rounded-full p-2`}>
        <AntDesign
          name={props.type === "Expense" ? "arrowdown" : "arrowup"}
          size={16}
          color="#3f3f46"
        />
      </View>
      <View style={tw`flex flex-col flex-1`}>
        <Text style={tw`font-bold text-lg text-zinc-950`}>{props.name}</Text>
        <Text style={tw`text-xs text-zinc-400`}>{props.description}</Text>
      </View>
      <View style={tw`flex flex-col flex-1 pr-2`}>
        {props.type === "Expense" ? (
          <Text style={tw`font-bold text-red-600 text-right`}>
            - ${props.amount}
          </Text>
        ) : (
          <Text style={tw`font-bold text-green-600 text-right`}>
            + ${props.amount}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CashFlowItem;

const styles = StyleSheet.create({});
