import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { data } from "@/utils/data";

type Props = {};

const TransactionModal = (props: Props) => {
  const [selected_option, setSelectedOption] = useState(
    data.transaction_types[0]
  );
  const addTransactionHandler = () => {};
  return (
    <View style={tw`bg-zinc-50 flex-1 p-4 gap-4`}>
      <View style={tw`flex-row items-center gap-2`}>
        {data.transaction_types.map((item) => (
          <Pressable
            onPress={() => setSelectedOption(item)}
            style={tw`${
              selected_option._id === item._id
                ? "bg-[#819595] border border-[#363946] "
                : "bg-white border border-zinc-200/50 "
            }   py-2 rounded-full px-4`}
            key={item._id}
          >
            <Text style={tw`text-[#363946] font-semibold`}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Transaction name"
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Description"
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder=" Amount"
        keyboardType="numeric"
      />
      <PrimaryButton text={"Add Transaction"} onPress={addTransactionHandler} />
    </View>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({});
