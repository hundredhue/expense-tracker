import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useCardContext } from "@/context/CardContext";
import { data } from "@/utils/data";
import { useState } from "react";
import tw from "twrnc";

export default function ModalScreen() {
  const [selected_option, setSelectedOption] = useState(data.account_types[0]);
  const { addCard } = useCardContext();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");

  const addAccountHandler = () => {
    setLoading(true);
    if (name && amount && number && selected_option) {
      addCard(name, parseFloat(amount), number, selected_option._id);
      setName("");
      setAmount("");
      setNumber("");
    }
    setLoading(false);
  };

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
        onChangeText={setName}
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Enter card name"
        value={name}
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Card number"
        onChangeText={setNumber}
        value={number}
      />
      <TextInput
        style={tw`bg-white p-3 border border-zinc-200/50 rounded-xl text-lg`}
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={setAmount}
        value={amount}
      />
      <PrimaryButton
        text={"Add Account"}
        loading={loading}
        onPress={addAccountHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
