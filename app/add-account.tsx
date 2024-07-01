import PrimaryButton from "@/components/buttons/PrimaryButton";
import { data } from "@/utils/data";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function ModalScreen() {
  const [selected_option, setSelectedOption] = useState(data.account_types[0]);

  const addAccountHandler = () => {};

  return (
    <View style={tw`bg-zinc-50 flex-1 p-4 gap-4`}>
      <View style={tw`flex-row items-center gap-2`}>
        {data.account_types.map((item) => (
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
        placeholder="Enter card name"
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Enter card number"
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Enter card amount"
        keyboardType="numeric"
      />
      <PrimaryButton text={"Add Account"} onPress={addAccountHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
